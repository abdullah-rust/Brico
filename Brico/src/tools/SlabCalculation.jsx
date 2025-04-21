import Header from "../components/Header";
import { useState } from "react";
import "./css files/slab.css";
import manuIcon from "../assets/slab.png";

export default function SlabCalculation() {
  const [length, setLength] = useState(0);
  const [width, setWidth] = useState(0);
  const [thickness, setThickness] = useState(4); // default in inches
  const [cementBags, setCementBags] = useState(0);
  const [sandVolume, setSandVolume] = useState(0);
  const [aggregateVolume, setAggregateVolume] = useState(0);
  const [sandPerBag, setSandPerBag] = useState(0);
  const [aggregatePerBag, setAggregatePerBag] = useState(0);
  const [customSandPerBag, setCustomSandPerBag] = useState(2.5); // default value
  const [customAggregatePerBag, setCustomAggregatePerBag] = useState(4.5); // default value

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
    <>
      <Header />
      <div className="container">
        <h1 className="text-xl font-bold mb-4">
          Slab Material <img src={manuIcon} alt="icon" />{" "}
        </h1>

        <div className="input">
          <h2>Length(feet)</h2>
          <input
            type="number"
            placeholder="Length (ft)"
            className="border p-2"
            onChange={(e) => setLength(parseFloat(e.target.value))}
          />
          <h2>Width(feet)</h2>
          <input
            type="number"
            placeholder="Width (ft)"
            className="border p-2"
            onChange={(e) => setWidth(parseFloat(e.target.value))}
          />
          <h2>Thickness(inches)</h2>
          <input
            type="number"
            placeholder="Thickness (inches)"
            className="border p-2"
            value={thickness}
            onChange={(e) => setThickness(parseFloat(e.target.value))}
          />
          <h2>Sand per Cement Bag (cft)</h2>
          <input
            type="number"
            placeholder="Sand per Cement Bag (cft)"
            className="border p-2"
            value={customSandPerBag}
            onChange={(e) => setCustomSandPerBag(parseFloat(e.target.value))}
          />
          <h2>Aggregate per Cement Bag (cft)</h2>
          <input
            type="number"
            placeholder="Aggregate per Cement Bag (cft)"
            className="border p-2"
            value={customAggregatePerBag}
            onChange={(e) =>
              setCustomAggregatePerBag(parseFloat(e.target.value))
            }
          />
        </div>

        <button onClick={calculate}>Calculate</button>

        <div className="result">
          <p>
            <strong>Cement Bags:</strong> {cementBags}
          </p>
          <p>
            <strong>Sand Volume (cft):</strong> {sandVolume}
          </p>
          <p>
            <strong>Aggregate Volume (cft):</strong> {aggregateVolume}
          </p>
          <p>
            <strong>Sand per Bag (cft):</strong> {sandPerBag}
          </p>
          <p>
            <strong>Aggregate per Bag (cft):</strong> {aggregatePerBag}
          </p>
        </div>
      </div>
    </>
  );
}
