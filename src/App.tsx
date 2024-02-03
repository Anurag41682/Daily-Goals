import "./App.css";
import { ThemeProvider } from "@/components/theme-provider";
import LandingPage from "./components/landingPage";
import FooterPage from "./components/footerPage";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="app h-screen w-screen">
        <LandingPage />
        <FooterPage />
      </div>
    </ThemeProvider>
  );
}

export default App;
