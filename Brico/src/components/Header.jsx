import "./Haeder.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import manuIcon from "../assets/manu.png";
export default function Header() {
  const navigate = useNavigate();
  return (
    <>
      <header>
        <img src={manuIcon} alt="lora" onClick={() => navigate("/side")} />
        <h1>Brico</h1>
      </header>
    </>
  );
}
