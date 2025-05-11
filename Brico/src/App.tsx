import "./App.css";
import { AnimatePresence } from "motion/react";
import { Routes, useLocation, Route } from "react-router-dom";
import Home from "./Home";
import Tools from "./tools/Tools";

function App() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/tools" element={<Tools />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
