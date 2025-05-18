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

  const [wallLength, setWallLength] = useState(0);
  const [wallThickness, setWallThickness] = useState(0);
  const [wallHeight, setWallHeight] = useState(0);
  const [wallCount, setWallCount] = useState(1);
  const [cement, setcement] = useState(450);
  const [sandPerBag, setSandPerBag] = useState(0);

  const [brickVolume, setbrickVolume] = useState(0.0625);

  const [result, setResult] = useState({
    bricks: 0,
    cementBags: 0,
    sand: 0,
  });

  function calculateBricks() {
    const wallThicknessFt = wallThickness / 12; // inch to feet
    const WallVolume = wallLength * wallHeight * wallThicknessFt * wallCount;

    const brickVol = brickVolume * 1.1; // mortar ke liye 10% extra
    const totalBricks = Math.ceil(WallVolume / brickVol);

    const cem = cement; // 1 cement bag se kitni bricks lagti hain
    const sandpbag = sandPerBag;

    const totalCementBags = Math.ceil(totalBricks / cem);
    const totalSand = parseFloat((totalCementBags * sandpbag).toFixed(2));

    // 💡 Yeh result set karo:
    setResult({
      bricks: totalBricks,
      cementBags: totalCementBags,
      sand: totalSand,
    });
  }

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
    const [length, setlength] = useState(9);
    const [width, setwidth] = useState(4);
    const [height, setheight] = useState(3);

    // (brickLength * brickWidth * brickHeight) / 1728;

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
        <input
          type="number"
          onChange={(e) => setlength(parseFloat(e.target.value))}
        />
        <img src={widthIcon} alt="icon" />
        <h2>Width brick (inch)</h2>
        <input
          type="number"
          onChange={(e) => setwidth(parseFloat(e.target.value))}
        />
        <img src={heightIcon} alt="icon" />
        <h2>Height brick (inch)</h2>
        <input
          type="number"
          onChange={(e) => setheight(parseFloat(e.target.value))}
        />
        <button
          className={styles.set_btn}
          onClick={() => {
            setbrickVolume((length * width * height) / 1728);
            window.history.back();
          }}
        >
          Set
        </button>
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
        <input
          type="number"
          onChange={(e) => setWallLength(parseFloat(e.target.value))}
        />
        <br />
        <h2>
          Wall Height(ft) <img src={wallIcon} alt="" />
        </h2>
        <input
          type="number"
          onChange={(e) => setWallHeight(parseFloat(e.target.value))}
        />
        <br />
        <h2>
          Wall Thickness (inch) <img src={wallIcon} alt="" />
        </h2>
        <input
          type="number"
          onChange={(e) => setWallThickness(parseFloat(e.target.value))}
        />
        <br />
        <h2>
          Wall counts <img src={countIcon} alt="" />
        </h2>
        <input
          type="number"
          onChange={(e) => setWallCount(parseFloat(e.target.value))}
        />
        <br />
        <h2>Cement Ratio(Bricks per Bag)</h2>
        <input
          type="number"
          onChange={(e) => setcement(parseFloat(e.target.value))}
        />
        <br />

        <h2>
          Sand feet (Per Bag) <img src={sandIcon} alt="" />
        </h2>
        <input
          type="number"
          onChange={(e) => setSandPerBag(parseFloat(e.target.value))}
        />
        <br />
        <button onClick={calculateBricks}>Calculate</button>
        <br />
        <br />
        <ul>
          <h2>Total Bricks : {result.bricks} </h2>
          <br />
          <h2>Total cement bages :{result.cementBags} </h2>
          <br />
          <h2>Total sand(ft) : {result.sand} </h2>
        </ul>
        <br />
        <br />
        <br />
        <br />
      </div>

      {option ? <Option /> : null}
    </div>
  );
}
