import { ScrollArea } from "@/components/ui/scroll-area";
interface taskProps {
  taskList: string[];
}

const Tasks: React.FC<taskProps> = (props) => {
  return (
    <ScrollArea className="mt-4 h-full w-3/4 rounded-md border p-4">
      {props.taskList.map((item, idx) => (
        <div key={idx}>{item}</div>
      ))}
    </ScrollArea>
  );
};
export default Tasks;
