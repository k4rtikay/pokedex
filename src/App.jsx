import "./App.css";
import AnimatedRoutes from "./components/AnimatedRoutes/AnimatedRoutes";
import { usePokedex } from "./Context/PokedexContext";
import { useEffect } from "react";

function App() {
  const { isDarkMode } = usePokedex();

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  return <AnimatedRoutes></AnimatedRoutes>;
}

export default App;
