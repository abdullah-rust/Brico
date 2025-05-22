import Header from "../../components/Header";
import styles from "./css/slab.module.css";
import { useState } from "react";
import { Card } from "./Plaster";
import { useRef } from "react";
export default function Tile() {
  const safeParse = (val: string) => parseFloat(val) || 0;
  //
  const [length, setLength] = useState(0);
  const [width, setWidth] = useState(0);
  const [wallCount, setWallCount] = useState(1);

  const [areaFeet, setAreaFeet] = useState("0");
  const [areaMeter, setAreaMeter] = useState("0");

  const calculate = (e: any) => {
    e.preventDefault();

    const areaFt = length * width * wallCount;
    const areaM = areaFt * 0.092903; // sqft to square meter

    setAreaFeet(areaFt.toFixed(2));
    setAreaMeter(areaM.toFixed(2));
  };

  //
  //
  //
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
    <div>
      <Header />
      <br />
      <br />
      <br />
      <br />
      <div className={styles.inner_div}>
        <h1>Tile Calculation</h1>
        <form onSubmit={calculate} className={styles.form}>
          <Card
            icon={wallLengthico}
            label="Wall Length(ft)"
            required={true}
            onChange={(e) => setLength(safeParse(e.target.value))}
          />
          <Card
            icon={wallHeightico}
            label="Wall Height(ft)"
            required={true}
            onChange={(e) => setWidth(safeParse(e.target.value))}
          />
          <Card
            icon={countIco}
            label="Wall Count"
            required={true}
            onChange={(e) => setWallCount(safeParse(e.target.value))}
          />
          <button type="submit" className={styles.button}>
            Calculate
          </button>
        </form>
      </div>
      <div ref={divRef} className={styles.resultContainer}>
        <div className={styles.copyButtonWrapper}>
          <button onClick={copyText} className={styles.copyButton}>
            Copy
          </button>
        </div>
        <ul className={styles.ul}>
          <h2>Total Tile in (sqft) : {areaFeet} </h2>
          <h2>Total Tile in (sqft) : {areaMeter} </h2>
        </ul>
      </div>
    </div>
  );
}

//import icons
import wallLengthico from "../../iconsAll/tools_ico/plaster/wall-length.png";
import wallHeightico from "../../iconsAll/tools_ico/plaster/wall-height.png";
import countIco from "../../assets/tools_icon/countwall.png";
