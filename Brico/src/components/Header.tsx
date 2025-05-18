import styles from "./css/header.module.css";
import manuIcone from "../assets/manu.png";
import { useNavigate, useLocation } from "react-router-dom";
import opIcon from "../assets/icons/option.png";
// import Joyride from "react-joyride";
// import { useState } from "react";

interface Props {
  path?: string;
  onOptionClick?: () => void;
}

export default function Header({ path, onOptionClick }: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  // const [run, setRun] = useState(true);
  const steps = [
    {
      target: "#icon", // class ya ID jahan tooltip dikhana hai
      content: "yeh manue hai ",
      // placement: "bottom",
    },
  ];
  return (
    <header className={styles.header}>
      {/* <Joyride
        steps={steps}
        // run={run}
        // continuous={true}
        // showProgress={true}
        // showSkipButton={true}
        styles={{
          options: {
            zIndex: 10000,
          },
        }}
      /> */}
      <img src={manuIcone} alt="manuicon" className={styles.icon} id="icon" />
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
