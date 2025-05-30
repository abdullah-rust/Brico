import styles from "./css/slab.module.css";
import Header from "../../components/Header";
import { useState, useRef } from "react";
export default function Paint() {
  const safeParse = (val: string) => parseFloat(val) || 0;

  const [length, setLength] = useState(0);
  const [height, setHeight] = useState(0);
  const [walls, setWalls] = useState(1);
  const [coverage, setCoverage] = useState(80); // sqft per liter default
  const [coats, setCoats] = useState(2);
  const [areaFeet, setAreaFeet] = useState("0");
  const [paintLiters, setPaintLiters] = useState("0");
  const [paintGallons, setPaintGallons] = useState("0");

  const calculate = (e:any) => {
    e.preventDefault();
    const wallAreaFt = length * height * walls;
    const paintLtr = (wallAreaFt * coats) / coverage;
    const paintGal = paintLtr / 3.785;

    setAreaFeet(wallAreaFt.toFixed(2));
    setPaintLiters(paintLtr.toFixed(2));
    setPaintGallons(paintGal.toFixed(2));
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
        <h1>Paint Calculation </h1>
        <form className={styles.form} onSubmit={calculate}>
          <Card
            label="Wall Length"
            icon={wallLengthico}
            required={true}
            onChange={(e) => setLength(safeParse(e.target.value))}
          />
          <Card
            label="Wall Height"
            icon={wallHeightico}
            required={true}
            onChange={(e) => setHeight(safeParse(e.target.value))}
          />
          <Card
            label="Number of Walls"
            icon={countIco}
            required={true}
            onChange={(e) => setWalls(safeParse(e.target.value))}
          />
          <Card
            label="Coverage per liter (sqft)"
            required={true}
            icon={covIco}
            onChange={(e) => setCoverage(safeParse(e.target.value))}
          />
          <Card
            label="Number of Coats"
            required={true}
            icon={coatsIco}
            onChange={(e) => setCoats(safeParse(e.target.value))}
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
          <h2>Total Wall Area (sqft): {areaFeet} </h2>
          <h2>Paint Required (liters): {paintLiters} </h2>
          <h2>Paint Required (gallons): {paintGallons} </h2>
        </ul>
      </div>
      <br />
    </div>
  );
}

//import  icons
import wallLengthico from "../../iconsAll/tools_ico/plaster/wall-length.png";
import wallHeightico from "../../iconsAll/tools_ico/plaster/wall-height.png";
import countIco from "../../assets/tools_icon/countwall.png";
import coatsIco from "../../iconsAll/tools_ico/slab-icon/coats.jpg";
import covIco from "../../iconsAll/tools_ico/slab-icon/cov.jpg";

import { Card } from "./Plaster";
