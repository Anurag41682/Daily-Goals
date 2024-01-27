import "./App.css";
import { useState, useEffect } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "./components/mode-toggle";

function App() {
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="app h-screen w-screen">
        <div className="flex justify-end pt-1 pr-1">
          <ModeToggle />
        </div>
        <div className="flex font-bold text-lg justify-center items-center">
          Current Time: {currentTime.toLocaleTimeString()}
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
