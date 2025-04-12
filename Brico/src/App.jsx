import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Home from "./Home";
import Sidbar from "./components/Sidbar";
import BricksCalculation from "./tools/BricksCalculation";
import CeilingCalculation from "./tools/CeilingCalculation";
import CementCalculation from "./tools/cementPlasterCalculation";
import MarbleCalculation from "./tools/MarbleCalculation";
import PaintCalculation from "./tools/PaintCalculation";
import SlabCalculation from "./tools/SlabCalculation";
import TileCalculation from "./tools/TileCalculation";
function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/bricks" element={<BricksCalculation />} />
        <Route path="/slab" element={<SlabCalculation />} />
        <Route path="/cement" element={<CementCalculation />} />
        <Route path="/tile" element={<TileCalculation />} />
        <Route path="/marble" element={<MarbleCalculation />} />
        <Route path="/paint" element={<PaintCalculation />} />
        <Route path="/c" element={<CeilingCalculation />} />

        <Route
          path="/side"
          element={
            <PageWrapper>
              <Sidbar />
            </PageWrapper>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

// Animation Wrapper Component
function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ x: -200 }}
      animate={{ x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.19 }}
    >
      {children}
    </motion.div>
  );
}
function PageWrapper2({ children }) {
  return (
    <motion.div
      initial={{ x: 0 }}
      animate={{ x: 1 }}
      exit={{ opacity: 0, x: 0 }}
      transition={{ duration: 0.19 }}
    >
      {children}
    </motion.div>
  );
}

export default App;
