import { ModeToggle } from "./mode-toggle";
import { useState, useEffect } from "react";
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

  const [taskList, setTaskList] = useState<string[]>([]);
  const [task, setTask] = useState<string>("");
  useEffect(() => {
    //made request at fetch route
    ipcRenderer.send("fetch");

    const handleTasksFetched = (event: any, fetchedTasks: string[]) => {
      setTaskList(fetchedTasks);
    };

    //listener for what is recieved from that route
    ipcRenderer.on("fetch", handleTasksFetched);

    // Clean up the event listener when the component unmounts
    return () => {
      ipcRenderer.removeListener("fetch", handleTasksFetched);
    };
  }, []);
  const handleKeyAdd = (e: React.KeyboardEvent<any>) => {
    if (e.key === "Enter") {
      ipcRenderer.send("add", { task: task });
      setTaskList((prevTask) => [...prevTask, task]);
      setTask("");
    }
  };
  const handleClickAdd = () => {
    ipcRenderer.send("add", { task: task });
    setTaskList((prevTask) => [...prevTask, task]);
    setTask("");
  };
  return (
    <div className=" items-center landing-page w-full h-full">
      <div className="flex justify-end pt-1 pr-1">
        <ModeToggle />
      </div>
      <div className="w-full h-5/6 flex flex-col font-bold text-lg justify-start items-center">
        <div className="flex flex-col justify-center items-center">
          <h1>{daysOfWeek[currentTime.getDay()]}</h1>
          <h1>{currentTime.toLocaleTimeString()}</h1>
        </div>
        <Tasks taskList={taskList} />
        <div className="flex mt-4  w-1/2 space-x-2">
          <Input
            onChange={(e) => {
              setTask(e.target.value);
            }}
            onKeyDown={handleKeyAdd}
            value={task}
            placeholder="Enter your tasks"
          />
          <Button onClick={handleClickAdd}>Add</Button>
        </div>
      </div>
    </div>
  );
};
export default LandingPage;
