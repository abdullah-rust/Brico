import Header from "../../components/Header";
import styles from "./css/slab.module.css";
import { useState } from "react";
import { Card } from "./Plaster";
import { useRef } from "react";
// import Button from "../../components/CopyButton";
// import icons
import slabWidthico from "../../iconsAll/tools_ico/slab-icon/slab-width.png";
import slabHeightico from "../../iconsAll/tools_ico/slab-icon/slab-height.png";
import slabThiknessico from "../../iconsAll/tools_ico/slab-icon/slab-thikness.png";
import sandIco from "../../iconsAll/tools_ico/slab-icon/sandIco.png";
import aggregateIco from "../../iconsAll/tools_ico/slab-icon/aggregateIco.png";

export default function Slab() {
  // utility function to prevent NaN
  const safeParse = (val: string) => parseFloat(val) || 0;

  const [length, setLength] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);
  const [thickness, setThickness] = useState<number>(4); // default in inches
  const [cementBags, setCementBags] = useState<string>("0");
  const [sandVolume, setSandVolume] = useState<string>("0");
  const [aggregateVolume, setAggregateVolume] = useState<string>("0");
  const [sandPerBag, setSandPerBag] = useState<string>("0");
  const [aggregatePerBag, setAggregatePerBag] = useState<string>("0");
  const [customSandPerBag, setCustomSandPerBag] = useState<number>(2); // default value
  const [customAggregatePerBag, setCustomAggregatePerBag] = useState<number>(4); // default value

  const calculate = (e: any) => {
    e.preventDefault();
    const area = length * width; // in sq.ft
    const thicknessInFeet = thickness / 12;
    const volumeCft = area * thicknessInFeet;

    const cementInBags =
      (volumeCft / (customSandPerBag + customAggregatePerBag + 1)) * 1; // assuming cement = 1 part
    const sandCft = cementInBags * customSandPerBag;
    const aggregateCft = cementInBags * customAggregatePerBag;

    const sandPerBagVal = sandCft / cementInBags;
    const aggregatePerBagVal = aggregateCft / cementInBags;

    setCementBags(cementInBags.toFixed(2));
    setSandVolume(sandCft.toFixed(2));
    setAggregateVolume(aggregateCft.toFixed(2));
    setSandPerBag(sandPerBagVal.toFixed(2));
    setAggregatePerBag(aggregatePerBagVal.toFixed(2));
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
        <h1>Slab Calculation</h1>
        <form onSubmit={calculate} className={styles.form}>
          {/* Slab Width */}

          <Card
            label="Slab Width(ft)"
            icon={slabWidthico}
            onChange={(e) => setWidth(safeParse(e.target.value))}
            required={true}
          />

          <Card
            label="Slab Length(ft)"
            icon={slabHeightico}
            onChange={(e) => setLength(safeParse(e.target.value))}
            required={true}
          />
          <Card
            label="Slab Thickness (inch)"
            icon={slabThiknessico}
            onChange={(e) => setThickness(safeParse(e.target.value))}
            required={true}
          />
          <Card
            label="Sand per Cement Bag (cft)"
            icon={sandIco}
            onChange={(e) => setCustomSandPerBag(safeParse(e.target.value))}
            required={true}
            list="sandRatio"
          />
          <datalist id="sandRatio">
            <option value="2">default</option>
            <option value="2.5">custom</option>
            <option value="3">custom</option>
            <option value="1.5">custom</option>
          </datalist>
          <Card
            label="Aggregate per Cement Bag (cft)"
            icon={aggregateIco}
            onChange={(e) =>
              setCustomAggregatePerBag(parseFloat(e.target.value))
            }
            required={true}
            list="aggregateRatio"
          />
          <datalist id="aggregateRatio">
            <option value="4">default</option>
            <option value="3">custom</option>
            <option value="6">custom</option>
          </datalist>

          <br />
          <button
            className={styles.button}
            type="submit"
            // disabled={length <= 0 || width <= 0 || thickness <= 0}
          >
            Calculate
          </button>
        </form>
      </div>

      <br />
      <div ref={divRef} className={styles.resultContainer}>
        <div className={styles.copyButtonWrapper}>
          <button onClick={copyText} className={styles.copyButton}>
            Copy
          </button>
        </div>
        <ul className={styles.ul}>
          <h2>Total Cement Bags: {cementBags}</h2>
          <h2>Total Sand (cft): {sandVolume}</h2>
          <h2>Total Aggregate (cft): {aggregateVolume}</h2>
          <h2>Sand per Bag (cft): {sandPerBag}</h2>
          <h2>Aggregate per Bag (cft): {aggregatePerBag}</h2>
        </ul>
      </div>

      <br />
      <br />
    </div>
  );
}
