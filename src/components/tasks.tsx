import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { DeleteIcon, EditIcon } from "lucide-react";

const ipcRenderer = window.ipcRenderer;

interface taskData {
  id: string;
  task: string;
  isMarked: boolean;
}
interface taskProps {
  taskList: taskData[];
  setTaskList: any;
  task: string;
  setTask: any;
  isEditing: boolean;
  setIsEditing: any;
  idToUpdate: string | null;
  setIdToUpdate: any;
  inputRef: any;
}

const Tasks: React.FC<taskProps> = (props) => {
  const handleEditClick = (item: any) => {
    props.setIsEditing(true);
    props.setTask(item.task);
    props.setIdToUpdate(item.id);
    props.inputRef.current.focus();
  };
  const handleDeleteClick = (id: string) => {
    ipcRenderer.send("delete", id);
    const updatedList = props.taskList.filter((item) => item.id !== id);
    props.setTaskList(updatedList);
  };
  const handleCheckboxChange = (id: string) => {
    ipcRenderer.send("mark-unmark", id);
    const updatedList = props.taskList.map((item) =>
      item.id === id ? { ...item, isMarked: !item.isMarked } : item
    );
    props.setTaskList(updatedList);
  };
  return props.taskList.length === 0 ? (
    <div className="flex justify-center items-center mt-4 h-full w-3/4 rounded-md border p-4">
      No data to show
    </div>
  ) : (
    <ScrollArea className="mt-4 h-full w-3/4 rounded-md border p-4">
      {props.taskList.map((item: taskData) => (
        <div key={item.id} className=" flex justify-between items-center p-2">
          <div className="space-x-4 flex justify-center items-center">
            <input
              className="h-5 md:h-6 lg:h-7 w-5 md:w-6 lg:w-7"
              type="checkbox"
              checked={item.isMarked}
              onChange={() => {
                handleCheckboxChange(item.id);
              }}
            ></input>
            <Label
              className={`${
                item.isMarked ? "line-through" : ""
              } text-sm  md:text-lg lg:text-xl`}
            >
              {item.task}
            </Label>
          </div>
          <div className="flex space-x-2 justify-center items-center">
            <button>
              <DeleteIcon
                onClick={() => {
                  handleDeleteClick(item.id);
                }}
                className="w-5 md:w-6 lg:w-7 h-5 md:h-6 lg:h-7"
              ></DeleteIcon>
            </button>
            <button>
              <EditIcon
                onClick={() => {
                  handleEditClick(item);
                }}
                className="w-5 md:w-6 lg:w-7 h-5 md:h-6 lg:h-7"
              />
            </button>
          </div>
        </div>
      ))}
    </ScrollArea>
  );
};
export default Tasks;
