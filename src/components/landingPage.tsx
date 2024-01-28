import { ModeToggle } from "./mode-toggle";
import { useState, useEffect } from "react";
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
    <div className="landing-page">
      <div className="flex justify-end pt-1 pr-1">
        <ModeToggle />
      </div>
      <div className="flex flex-col font-bold text-lg justify-center items-center">
        <h1>Day: {daysOfWeek[currentTime.getDay()]}</h1>
        <h1>Current Time: {currentTime.toLocaleTimeString()}</h1>
      </div>
    </div>
  );
};
export default LandingPage;
