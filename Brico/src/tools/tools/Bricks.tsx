import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import styles from "./css/bricks.module.css";
import { motion } from "motion/react";
import lengthIcon from "../../assets/tools_icon/length.png";
import widthIcon from "../../assets/tools_icon/width.png";
import heightIcon from "../../assets/tools_icon/height.png";
import wallIcon from "../../assets/tools_icon/wall.png";
import countIcon from "../../assets/tools_icon/countwall.png";
import sandIcon from "../../assets/tools_icon/sand_icon.png";
export default function Bricks() {
  const navigate = useNavigate();

  const [option, setoption] = useState(false);

  useEffect(() => {
    const handleBack = () => {
      // Jab back button dabaye aur option open ho, toh close karo
      if (option) {
        setoption(false);
      }
    };

    // Agar option open hai, toh popstate suno
    if (option) {
      window.addEventListener("popstate", handleBack);
    }

    // Cleanup: jab option band ho ya component unmount ho
    return () => {
      window.removeEventListener("popstate", handleBack);
    };
  }, [option]);

  function Option() {
    return (
      <motion.div
        className={styles.option}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <button
          onClick={() => {
            setoption(false);
            navigate(-1);
          }}
          className={styles.cross_btn_in_option}
        >
          ❌
        </button>
        <h1>Brick Size</h1>
        <img src={lengthIcon} alt="icon" />
        <h2>Length brick (inch)</h2>
        <input type="number" />
        <img src={widthIcon} alt="icon" />
        <h2>Width brick (inch)</h2>
        <input type="number" />
        <img src={heightIcon} alt="icon" />
        <h2>Height brick (inch)</h2>
        <input type="number" />
        <button className={styles.set_btn}>Set</button>
      </motion.div>
    );
  }

  function handleOption() {
    setoption(true);
    // Dummy push: taake back kaam kare
    window.history.pushState({}, "", window.location.pathname);
  }

  return (
    <div
      className={`${styles.container} ${option ? styles.container_shadow : ""}`}
    >
      <Header path="/tools/bricks" onOptionClick={handleOption} />
      <br />
      <br />
      <br />
      <br />

      <div className={styles.inner_container}>
        <h1>Bricks calculation</h1>
        <br />
        <h2>
          Wall Length(ft) <img src={wallIcon} alt="" />
        </h2>
        <input type="number" />
        <br />
        <h2>
          width Length(ft) <img src={wallIcon} alt="" />
        </h2>
        <input type="number" />
        <br />
        <h2>
          Wall counts <img src={countIcon} alt="" />
        </h2>
        <input type="number" />
        <br />
        <h2>
          Sand feet (Per Bag) <img src={sandIcon} alt="" />
        </h2>
        <input type="number" />
        <br />
        <button>Calculate</button>
        <br />
        <br />
        <ul>
          <h2>Total Bricks : 1000</h2>
          <br />
          <h2>Total cement bages : 1000</h2>
          <br />
          <h2>Total sand(ft) : 1000</h2>
        </ul>
      </div>

      {option ? <Option /> : null}
    </div>
  );
}
