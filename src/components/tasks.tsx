import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { DeleteIcon, EditIcon } from "lucide-react";
interface taskProps {
  taskList: string[];
}

const Tasks: React.FC<taskProps> = (props) => {
  const [isLined, setIsLined] = useState<boolean[]>([]);
  const handleEditClick = () => {
    console.log("Clicked");
  };
  const handleCheckboxClick = (idx: number) => {
    isLined[idx] = !isLined[idx];
    setIsLined(isLined);
  };
  return (
    <ScrollArea className="mt-4 h-full w-3/4 rounded-md border p-4">
      {props.taskList.map((item: string, idx) => (
        <div key={idx} className=" flex justify-between items-center p-2">
          <div className="space-x-4 flex items-center">
            <Checkbox
              onClick={() => {
                handleCheckboxClick(idx);
              }}
              className="h-5 md:h-6 lg:h-7 w-5 md:w-6 lg:w-7"
            />
            <Label
              className={`${
                isLined[idx] ? "line-through" : ""
              } text-sm  md:text-lg lg:text-xl`}
            >
              {item}
            </Label>
          </div>
          <div className="flex space-x-2 justify-center items-center">
            <button>
              <DeleteIcon></DeleteIcon>
            </button>
            <button>
              <EditIcon
                onClick={handleEditClick}
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
