import { Routes, Route } from "react-router-dom";
import "../src/styles/main.css";
import Home from "./pages/Home";
import AiAdvisor from "./pages/aiAdvisor.jsx";
import Recipes from "./pages/recipes.jsx";
import Nutrition from "./pages/nutrition.jsx";
import MenuPlanner from "./pages/menu.jsx";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/features/ai" element={<AiAdvisor />} />
        <Route path="/features/recipes" element={<Recipes />} />
        <Route path="/features/nutrition" element={<Nutrition />} />
        <Route path="/features/menu" element={<MenuPlanner />} />
      </Routes>
    </>
  );
}
