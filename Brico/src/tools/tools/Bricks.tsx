import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import Header from "../../components/Header";
import styles from "./css/bricks.module.css";
import styles2 from "./css/slab.module.css";
import { motion } from "motion/react";
import lengthIcon from "../../assets/tools_icon/length.png";
import widthIcon from "../../assets/tools_icon/width.png";
import heightIcon from "../../assets/tools_icon/height.png";
import wallIcon from "../../assets/tools_icon/wall.png";
import countIcon from "../../assets/tools_icon/countwall.png";
import sandIcon from "../../iconsAll/tools_ico/slab-icon/sandIco.png";
import { Card } from "./Plaster";
export default function Bricks() {
  const safeParse = (val: string) => parseFloat(val) || 0;
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

  function calculateBricks(e: any) {
    e.preventDefault();
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

    function handleset(e: any) {
      e.preventDefault();
      setbrickVolume((length * width * height) / 1728);

      window.history.back();
    }
    // (brickLength * brickWidth * brickHeight) / 1728;

    return (
      <form onSubmit={handleset}>
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
            required
            step="any"
          />
          <img src={widthIcon} alt="icon" />
          <h2>Width brick (inch)</h2>
          <input
            type="number"
            onChange={(e) => setwidth(parseFloat(e.target.value))}
            step="any"
            required
          />
          <img src={heightIcon} alt="icon" />
          <h2>Height brick (inch)</h2>
          <input
            type="number"
            onChange={(e) => setheight(parseFloat(e.target.value))}
            required
            step="any"
          />
          <button className={styles.set_btn} type="submit">
            Set
          </button>
        </motion.div>
      </form>
    );
  }

  function handleOption() {
    setoption(true);
    // Dummy push: taake back kaam kare
    window.history.pushState({}, "", window.location.pathname);
    window.scrollTo({
      top: 0,
      behavior: "smooth", // smooth animation ke liye
    });
  }

  const divRef = useRef<HTMLDivElement>(null);

  const copyText = () => {
    // ✅ Ab TypeScript ko pata hai current mein div element hoga
    if (divRef.current) {
      const text = divRef.current.innerText;
      navigator.clipboard
        .writeText(text)
        .then(() => alert("Text copied!"))
        .catch((err) => console.error("Copy failed:", err));
    }
  };

  return (
    <div
      className={`${styles.container} ${option ? styles.container_shadow : ""}`}
    >
      <Header path="/tools/bricks" onOptionClick={handleOption} />
      <br />
      <br />
      <br />
      <br />

      <div className={styles2.inner_div}>
        <h1>Bricks calculation</h1>
        <br />
        <form onSubmit={calculateBricks} className={styles.form}>
          <Card
            label="Wall Length(ft)"
            icon={wallIcon}
            required={true}
            onChange={(e) => setWallLength(safeParse(e.target.value))}
          />
          <Card
            label="Wall Height(ft)"
            icon={wallIcon}
            required={true}
            onChange={(e) => setWallHeight(safeParse(e.target.value))}
          />
          <Card
            label="Wall Thickness(inch)"
            icon={wallIcon}
            required={true}
            onChange={(e) => setWallThickness(safeParse(e.target.value))}
          />
          <Card
            label="Wall Count"
            icon={countIcon}
            required={true}
            onChange={(e) => setWallCount(safeParse(e.target.value))}
          />
          <Card
            label="Cement Ratio(Bricks per Bag)"
            required={true}
            onChange={(e) => setcement(safeParse(e.target.value))}
            list="ratio"
          />

          <datalist id="ratio">
            <option value="600"></option>
            <option value="450"></option>
            <option value="700"></option>
          </datalist>
          <Card
            label="Sand feet (Per Bag) "
            required={true}
            icon={sandIcon}
            onChange={(e) => setSandPerBag(safeParse(e.target.value))}
            list="sand"
          />

          <datalist id="sand">
            <option value="6"></option>
            <option value="8"></option>
            <option value="10"></option>
          </datalist>

          <br />
          <button className={styles2.button} type="submit">
            Calculate
          </button>
        </form>
        <br />
        <br />
      </div>

      <div ref={divRef} className={styles2.resultContainer}>
        <div className={styles2.copyButtonWrapper}>
          <button onClick={copyText} className={styles2.copyButton}>
            Copy
          </button>
        </div>
        <ul className={styles2.ul}>
          <h2>Total Bricks : {result.bricks} </h2>
          <h2>Total cement bages :{result.cementBags} </h2>
          <h2>Total sand(ft) : {result.sand} </h2>
        </ul>
      </div>

      <br />

      {option ? <Option /> : null}
    </div>
  );
}
