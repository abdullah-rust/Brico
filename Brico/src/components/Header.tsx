import styles from "./css/header.module.css";
import manuIcone from "../assets/manu.png";
import { useNavigate, useLocation } from "react-router-dom";
export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <header className={styles.header}>
      <img
        src={manuIcone}
        alt="manuicon"
        className={styles.icon}
        onClick={() => {
          if (location.pathname != "/tools") {
            navigate("/tools");
          } else if (location.pathname == "/tools") {
            navigate(-1);
          }
        }}
      />
      <h1>Brico</h1>
    </header>
  );
}
