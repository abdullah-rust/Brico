import { Routes, Route, useLocation } from "react-router-dom";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

import Home from "./Home";
import Sidbar from "./components/Sidbar";
import BricksCalculation from "./tools/BricksCalculation";
import CementCalculation from "./tools/cementPlasterCalculation";
import MarbleCalculation from "./tools/MarbleCalculation";
import PaintCalculation from "./tools/PaintCalculation";
import SlabCalculation from "./tools/SlabCalculation";
import TileCalculation from "./tools/TileCalculation";
import ContactForm from "./other/Feedback";
import Profile from "./other/profile";
import Signup from "./auth/signup";
import Login from "./auth/Login";
import Auth from "./auth/auth";

function App() {
  const location = useLocation();

  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<Home />} />
      <Route path="/bricks" element={<BricksCalculation />} />
      <Route path="/slab" element={<SlabCalculation />} />
      <Route path="/cement" element={<CementCalculation />} />
      <Route path="/tile" element={<TileCalculation />} />
      <Route path="/marble" element={<MarbleCalculation />} />
      <Route path="/paint" element={<PaintCalculation />} />
      <Route path="/contact" element={<ContactForm />} />

      <Route
        path="/auth"
        element={
          <PageWrapper4>
            <Auth />
          </PageWrapper4>
        }
      />

      <Route
        path="/signup"
        element={
          <PageWrapper3>
            <Signup />
          </PageWrapper3>
        }
      />

      <Route
        path="/login"
        element={
          <PageWrapper3>
            <Login />
          </PageWrapper3>
        }
      />

      <Route
        path="/profile"
        element={
          <PageWrapper2>
            <Profile />
          </PageWrapper2>
        }
      />

      <Route
        path="/side"
        element={
          <PageWrapper>
            <Sidbar />
          </PageWrapper>
        }
      />
    </Routes>
  );
}

// ✅ Animation Wrappers using GSAP

function PageWrapper({ children }) {
  const el = useRef();

  useLayoutEffect(() => {
    gsap.fromTo(
      el.current,
      { x: -200, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.3, ease: "power2.out" }
    );
  }, []);

  return <div ref={el}>{children}</div>;
}

function PageWrapper2({ children }) {
  const el = useRef();

  useLayoutEffect(() => {
    gsap.fromTo(
      el.current,
      { x: 300, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.3, ease: "power2.out" }
    );
  }, []);

  return <div ref={el}>{children}</div>;
}

function PageWrapper3({ children }) {
  const el = useRef();

  useLayoutEffect(() => {
    gsap.fromTo(
      el.current,
      { x: 300, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.3, ease: "power2.out" }
    );
  }, []);

  return <div ref={el}>{children}</div>;
}

function PageWrapper4({ children }) {
  const el = useRef();

  useLayoutEffect(() => {
    gsap.fromTo(
      el.current,
      { y: 200, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.3, ease: "power2.out" }
    );
  }, []);

  return <div ref={el}>{children}</div>;
}

export default App;
