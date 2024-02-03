import { ModeToggle } from "./mode-toggle";
import { useState, useEffect, useRef } from "react";
import Tasks from "./tasks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ipcRenderer = window.ipcRenderer;

const LandingPage = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  interface taskData {
    id: string;
    task: string;
    isMarked: boolean;
  }
  const [taskList, setTaskList] = useState<taskData[]>([]);
  const [task, setTask] = useState<string>("");
  const [isEditing, setIsEditing] = useState(false);
  const [idToUpdate, setIdToUpdate] = useState(null);
  const inputRef = useRef(null);
  useEffect(() => {
    //made request at fetch route
    ipcRenderer.send("fetch");

    const handleTasksFetched = (event: any, fetchedTasks: taskData[]) => {
      setTaskList(fetchedTasks);
    };

    //listener for what is recieved from that route
    ipcRenderer.on("fetch", handleTasksFetched);
  }, []);
  useEffect(() => {
    const handleAddEvent = (event: any, receviedData: taskData) => {
      setTaskList((prevTask) => [
        ...prevTask,
        {
          id: receviedData.id,
          task: receviedData.task,
          isMarked: receviedData.isMarked,
        },
      ]);
      setTask("");
    };
    ipcRenderer.removeAllListeners("add");
    ipcRenderer.on("add", handleAddEvent);
  }, []);
  const handleKeyAdd = (e: React.KeyboardEvent<any>) => {
    if (e.key === "Enter") {
      ipcRenderer.send("add", task);
    }
  };
  const handleClickAdd = () => {
    ipcRenderer.send("add", task);
  };
  const updateEditedComponent = () => {
    const updatedData = taskList.map((item) =>
      item.id === idToUpdate ? { ...item, task: task } : item
    );
    setTaskList(updatedData);
    setTask("");
    setIsEditing(false);
  };
  const handleKeyEdit = (e: React.KeyboardEvent<any>) => {
    if (e.key === "Enter") {
      ipcRenderer.send("edit", { idToUpdate, task });
      updateEditedComponent();
    }
  };
  const handleClickEdit = () => {
    ipcRenderer.send("edit", { idToUpdate, task });
    updateEditedComponent();
  };
  const handleClearAll = () => {
    ipcRenderer.send("clear");
    setTaskList([]);
  };
  return (
    <div className=" items-center landing-page w-full h-5/6">
      <div className="flex justify-end pt-1 pr-1">
        <ModeToggle />
      </div>
      <div className="w-full h-full flex flex-col font-bold text-lg justify-start items-center">
        <div className="flex flex-col justify-center items-center">
          <h1>{daysOfWeek[currentTime.getDay()]}</h1>
          <h1>{currentTime.toLocaleTimeString()}</h1>
        </div>

        <Tasks
          setTaskList={setTaskList}
          taskList={taskList}
          task={task}
          setTask={setTask}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          idToUpdate={idToUpdate}
          setIdToUpdate={setIdToUpdate}
          inputRef={inputRef}
        />

        <div className="flex mt-4  w-3/4 space-x-2">
          <Input
            onChange={(e) => {
              setTask(e.target.value);
            }}
            onKeyDown={isEditing ? handleKeyEdit : handleKeyAdd}
            value={task}
            placeholder="Enter your tasks"
            ref={inputRef}
          />
          <Button onClick={isEditing ? handleClickEdit : handleClickAdd}>
            {isEditing ? "Edit" : "Add"}
          </Button>
          <Button onClick={handleClearAll}>Clear</Button>
        </div>
      </div>
    </div>
  );
};
export default LandingPage;
