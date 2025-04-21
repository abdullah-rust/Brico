import styles from "./auth.module.css";

import { Typewriter } from "react-simple-typewriter";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 style={{ color: "#ff006a" }}>
          <Typewriter
            words={[
              "Brico: Smart Construction",
              "Estimate Materials Fast",
              "Plan Like a Pro",
            ]}
            loop={0} // infinity loop ke liye 0
            cursor
            cursorStyle="_"
            typeSpeed={80}
            deleteSpeed={60}
            delaySpeed={1500}
          />
        </h2>
        <button
          className={styles.card_button1}
          onClick={() => navigate("/login", { replace: true })}
        >
          Log In
        </button>
        <button
          className={styles.card_button2}
          onClick={() => navigate("/signup", { replace: true })}
        >
          Sign Up
        </button>
        <p className={styles.text_info}>
          Securely save your data and access it anytime, anywhere.
        </p>
      </div>
    </div>
  );
}
