import "./App.css";
import { ThemeProvider } from "@/components/theme-provider";
import LandingPage from "./components/landingPage";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="app h-screen w-screen">
        <LandingPage />
      </div>
    </ThemeProvider>
  );
}

export default App;
