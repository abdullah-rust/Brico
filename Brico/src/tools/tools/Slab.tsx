import Header from "../../components/Header";
import styles from "./css/slab.module.css";
import { useState } from "react";

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
  const [customSandPerBag, setCustomSandPerBag] = useState<number>(2.5); // default value
  const [customAggregatePerBag, setCustomAggregatePerBag] =
    useState<number>(4.5); // default value

  const calculate = () => {
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

  return (
    <div>
      <Header />
      <br />
      <br />
      <br />
      <br />
      <div className={styles.inner_div}>
        <h1>Slab Calculation</h1>

        {/* Slab Width */}
        <div className={styles.card}>
          <div className={styles.card_left}>
            <h2>Slab Width(ft)</h2>
            <input
              type="number"
              onChange={(e) => setWidth(safeParse(e.target.value))}
            />
          </div>
          <div className={styles.card_right}>
            <img
              src={slabWidthico || ""}
              alt="ico"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          </div>
        </div>

        {/* Slab Length */}
        <div className={styles.card}>
          <div className={styles.card_left}>
            <h2>Slab Length(ft)</h2>
            <input
              type="number"
              onChange={(e) => setLength(safeParse(e.target.value))}
            />
          </div>
          <div className={styles.card_right}>
            <img
              src={slabHeightico || ""}
              alt="ico"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          </div>
        </div>

        {/* Slab Thickness */}
        <div className={styles.card}>
          <div className={styles.card_left}>
            <h2>Slab Thickness (inch)</h2>
            <input
              type="number"
              onChange={(e) => setThickness(safeParse(e.target.value))}
            />
          </div>
          <div className={styles.card_right}>
            <img
              src={slabThiknessico || ""}
              alt="ico"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          </div>
        </div>

        {/* Sand per Cement Bag */}
        <div className={styles.card}>
          <div className={styles.card_left}>
            <h2>Sand per Cement Bag (cft)</h2>
            <input
              type="number"
              onChange={(e) => setCustomSandPerBag(safeParse(e.target.value))}
            />
          </div>
          <div className={styles.card_right}>
            <img
              src={sandIco || ""}
              alt="ico"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          </div>
        </div>

        {/* Aggregate per Cement Bag */}
        <div className={styles.card}>
          <div className={styles.card_left}>
            <h2>Aggregate per Cement Bag (cft)</h2>
            <input
              type="number"
              onChange={(e) =>
                setCustomAggregatePerBag(safeParse(e.target.value))
              }
            />
          </div>
          <div className={styles.card_right}>
            <img
              src={aggregateIco || ""}
              alt="ico"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          </div>
        </div>

        <br />
        <button
          className={styles.button}
          onClick={calculate}
          disabled={length <= 0 || width <= 0 || thickness <= 0}
        >
          Calculate
        </button>
      </div>

      <br />
      <ul className={styles.ul}>
        <h2>Total Cement Bags: {cementBags}</h2>
        <br />
        <h2>Total Sand (cft): {sandVolume}</h2>
        <br />
        <h2>Total Aggregate (cft): {aggregateVolume}</h2>
        <br />
        <h2>Sand per Bag (cft): {sandPerBag}</h2>
        <br />
        <h2>Aggregate per Bag (cft): {aggregatePerBag}</h2>
      </ul>
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}
