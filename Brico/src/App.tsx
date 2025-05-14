import "./App.css";
import { AnimatePresence } from "motion/react";
import { Routes, useLocation, Route } from "react-router-dom";
import Home from "./Home";
import Tools from "./tools/Tools";
import Bricks from "./tools/tools/Bricks";
import Slab from "./tools/tools/Slab";
import Plaster from "./tools/tools/Plaster";
import Marble from "./tools/tools/Marble";
import Tile from "./tools/tools/Tile";
import Paint from "./tools/tools/Paint";
import Block from "./tools/tools/Block";
function App() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/tools/bricks" element={<Bricks />} />
        <Route path="/tools/slab" element={<Slab />} />
        <Route path="/tools/plaster" element={<Plaster />} />
        <Route path="/tools/marble" element={<Marble />} />
        <Route path="/tools/tile" element={<Tile />} />
        <Route path="/tools/paint" element={<Paint />} />
        <Route path="/tools/block" element={<Block />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
