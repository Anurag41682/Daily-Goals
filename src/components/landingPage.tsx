import { ModeToggle } from "./mode-toggle";
import { useState, useEffect } from "react";
import Tasks from "./tasks";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
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
  return (
    <div className=" items-center landing-page w-full h-full">
      <div className="flex justify-end pt-1 pr-1">
        <ModeToggle />
      </div>
      <div className="w-full h-5/6 flex flex-col font-bold text-lg justify-start items-center">
        <div className="flex flex-col justify-center items-center">
          <h1>Day: {daysOfWeek[currentTime.getDay()]}</h1>
          <h1>Current Time: {currentTime.toLocaleTimeString()}</h1>
        </div>
        <Tasks />
        <div className="mt-3 grid w-1/2 gap-2">
          <Textarea className="h-px" placeholder="Enter your tasks" />
          <Button>Add</Button>
        </div>
      </div>
    </div>
  );
};
export default LandingPage;
