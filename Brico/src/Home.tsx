import Header from "./components/Header";
import { motion } from "motion/react";
import styles from "./home.module.css";
import homeIcon from "./assets/home-img/home-icon.png";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <Header />
      <br />
      <br />
      <br />
      <br />
      <motion.div
        className={styles.container}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        exit={{ opacity: 0, transition: { duration: 0.1 } }}
      >
        <h1>
          <img src={homeIcon} alt="home_icon" />
        </h1>

        <div className={styles.card1} onClick={() => navigate("/tools")}>
          <h1>Tools</h1>
        </div>
        <div className={`${styles.card1} ${styles.card2}`}>
          <h1>House Plan</h1>
        </div>
        <div className={`${styles.card1} ${styles.card3}`}>
          <h1>3D Models</h1>
        </div>

        <br />
        <br />
        <br />
        <br />
      </motion.div>
    </div>
  );
}
