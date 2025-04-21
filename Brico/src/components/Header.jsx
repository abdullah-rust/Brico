import "./Haeder.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import manuIcon from "../assets/manu.png";
export default function Header() {
  const navigate = useNavigate();

  function check() {
    let token = localStorage.getItem("token");
    if (token) {
      navigate("/profile");
    } else {
      navigate("/auth");
    }
  }
  return (
    <>
      <header>
        <img src={manuIcon} alt="lora" onClick={() => navigate("/side")} />
        <h1>Brico</h1>
        <div className="profile_icon" onClick={check}></div>
      </header>
    </>
  );
}
