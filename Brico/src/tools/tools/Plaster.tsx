import styles from "./css/slab.module.css";
import Header from "../../components/Header";
import { useState, useRef } from "react";
export default function Plaster() {
  const safeParse = (val: string) => parseFloat(val) || 0;

  const [length, setLength] = useState(0);
  const [height, setHeight] = useState(0);
  const [wallCount, setWallCount] = useState(1);
  const [thickness, setThickness] = useState(12); // default in mm
  const [sandPerBag, setSandPerBag] = useState(4); // default CFT
  const [cementBags, setCementBags] = useState("0");
  const [sandVolume, setSandVolume] = useState("0");

  const calculate = (e: any) => {
    e.preventDefault();
    const area = length * height * wallCount; // sqft
    const thicknessInFeet = thickness / 304.8; // mm to feet
    const wetVolume = area * thicknessInFeet;
    const dryVolume = wetVolume * 1.33;

    const totalParts = 1 + sandPerBag / 1; // cement:sand = 1:sandPerBag
    const cementVolume = dryVolume / totalParts;
    const cementBagCount = cementVolume / 1.25; // 1 cement bag = 1.25 cft
    const sandVolumeCalc = cementBagCount * sandPerBag;

    setCementBags(cementBagCount.toFixed(2));
    setSandVolume(sandVolumeCalc.toFixed(2));
  };
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
        <h1>Cement Plaster</h1>

        <form className={styles.form} onSubmit={calculate}>
          <Card
            label="Wall Length(ft)"
            icon={wallLengthico}
            onChange={(e) => setLength(safeParse(e.target.value))}
          />
          <Card
            label="Wall Height(ft)"
            icon={wallHeightico}
            onChange={(e) => setHeight(safeParse(e.target.value))}
          />
          <Card
            label="Wall Count"
            icon={countIco}
            onChange={(e) => setWallCount(safeParse(e.target.value))}
          />
          <Card
            label="Plaster Thickness(mm)"
            icon={plasterThiknessIco}
            onChange={(e) => setThickness(safeParse(e.target.value))}
            list="thickness"
          />
          <datalist id="thickness">
            <option value="12">(0.5 inch)</option>
            <option value="20">(0.75 inch)</option>
            <option value="22">(1 inch)</option>
          </datalist>
          <Card
            label="Sand per Cement Bag(cft)"
            icon={sandIco}
            onChange={(e) => setSandPerBag(safeParse(e.target.value))}
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
          <h2>Total cement : {cementBags} </h2>
          <h2>Total sand(cft) : {sandVolume} </h2>
        </ul>
      </div>
    </div>
  );
}

// import icons

import wallLengthico from "../../iconsAll/tools_ico/plaster/wall-length.png";
import wallHeightico from "../../iconsAll/tools_ico/plaster/wall-height.png";
import countIco from "../../assets/tools_icon/countwall.png";
import plasterThiknessIco from "../../assets/img/plaster.jpg";
import sandIco from "../../iconsAll/tools_ico/slab-icon/sandIco.png";

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
export function Card({
  label,
  onChange,
  icon,
  required = true,
  list,
}: {
  label: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: string;
  required?: boolean;
  list?: string;
}) {
  return (
    <div className={styles.card}>
      <div className={styles.card_left}>
        <h2>{label}</h2>
        <input
          type="number"
          onChange={onChange}
          required={required}
          list={list}
          step="any"
        />
      </div>
      <div className={styles.card_right}>
        <img
          src={icon || ""}
          alt="ico"
          onError={(e) => (e.currentTarget.style.display = "none")}
        />
      </div>
    </div>
  );
}
