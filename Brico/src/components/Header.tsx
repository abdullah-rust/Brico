import styles from "./css/header.module.css";
import manuIcone from "../assets/manu.png";
import { useNavigate, useLocation } from "react-router-dom";
import opIcon from "../assets/icons/option.png";

interface Props {
  path?: string;
  onOptionClick?: () => void;
}

export default function Header({ path, onOptionClick }: Props) {
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
            navigate("/");
          }
        }}
      />
      <h1>Brico</h1>
      {location.pathname == path ? (
        <img
          src={opIcon}
          alt="icon"
          className={styles.op_icon}
          onClick={() => {
            if (onOptionClick) onOptionClick();
          }}
        />
      ) : (
        ""
      )}
    </header>
  );
}
