import Header from "../components/Header";
import { motion } from "motion/react";
import styles from "./css/tools.module.css";
import { useNavigate } from "react-router-dom";
import toolIcon from "../assets/img/tools-icon.png";
export default function Tools() {
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
        initial={{ opacity: 0, x: -200 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        exit={{ opacity: 0, x: -300, transition: { duration: 0.3 } }}
      >
        <h1>
          <img src={toolIcon} alt="tool-icon" />
        </h1>
        <div className={`${styles.card1}`}>
          <h1>Bricks</h1>
          <h2>Calculation</h2>
        </div>
        <div className={`${styles.card1} ${styles.card2}`}>
          <h1>Slab</h1>
          <h2>Calculation</h2>
        </div>{" "}
        <div className={`${styles.card1} ${styles.card3}`}>
          <h1>cement Plaster</h1>
          <h2>Calculation</h2>
        </div>{" "}
        <div className={`${styles.card1} ${styles.card4}`}>
          <h1>Marble</h1>
          <h2>Calculation</h2>
        </div>{" "}
        <div className={`${styles.card1} ${styles.card5}`}>
          <h1>Tile</h1>
          <h2>Calculation</h2>
        </div>
        <div className={`${styles.card1} ${styles.card6}`}>
          <h1>Paint</h1>
          <h2>Calculation</h2>
        </div>
        <div className={`${styles.card1} ${styles.card7}`}>
          <h1>Concrete Block</h1>
          <h2>Calculation</h2>
        </div>
        <br />
        <br />
        <br />
        <br />
      </motion.div>
    </div>
  );
}
