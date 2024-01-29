import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface taskProps {
  taskList: string[];
}

const Tasks: React.FC<taskProps> = (props) => {
  return (
    <ScrollArea className="mt-4 h-full w-3/4 rounded-md border p-4">
      {props.taskList.map((item, idx) => (
        <div className="space-x-2 flex items-center pl-2 pt-2">
          <Checkbox className="h-5 md:h-6 lg:h-7 w-5 md:w-6 lg:w-7" />
          <Label className="text-sm md:text-lg lg:text-xl" key={idx}>
            {item}
          </Label>
        </div>
      ))}
    </ScrollArea>
  );
};
export default Tasks;
