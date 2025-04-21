import Header from "../components/Header";
import { useState } from "react";
import "./css files/plaster.css";
import manuIcon from "../assets/plaster.png";

export default function CementCalculation() {
  const [length, setLength] = useState(0);
  const [width, setWidth] = useState(0);
  const [thickness, setThickness] = useState(12); // default in mm
  const [sandPerBag, setSandPerBag] = useState(4); // default CFT
  const [cementBags, setCementBags] = useState(0);
  const [sandVolume, setSandVolume] = useState(0);

  const calculate = () => {
    const area = length * width; // sqft
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

  return (
    <>
      <Header />
      <div className="container">
        <h1 className="text-xl font-bold mb-4">
          Cement Plaster <img src={manuIcon} alt="icon" className="icon" />{" "}
        </h1>

        <div className="input">
          <h2>Length (ft)</h2>
          <input
            type="number"
            placeholder="Length (ft)"
            className="border p-2"
            onChange={(e) => setLength(parseFloat(e.target.value))}
          />
          <h2>Width (ft)</h2>
          <input
            type="number"
            placeholder="Width (ft)"
            className="border p-2"
            onChange={(e) => setWidth(parseFloat(e.target.value))}
          />
          <h2>Plaster Thickness (mm)</h2>
          <input
            type="number"
            placeholder="Plaster Thickness (mm)"
            className="border p-2"
            value={thickness}
            onChange={(e) => setThickness(parseFloat(e.target.value))}
          />
          <h2>Sand per Cement Bag (cft)</h2>
          <input
            type="number"
            placeholder="Sand per Cement Bag (cft)"
            className="border p-2"
            value={sandPerBag}
            onChange={(e) => setSandPerBag(parseFloat(e.target.value))}
          />
        </div>

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={calculate}
        >
          Calculate
        </button>

        <div className="result">
          <p>
            <strong>Cement Bags:</strong> {cementBags}
          </p>
          <p>
            <strong>Sand Volume (cft):</strong> {sandVolume}
          </p>
        </div>

        <div className="detail">
          <h2>12 mm (0.5 inch)</h2>
          <h2>20 mm (0.75 inch)</h2>
          <h2>25 mm (1 inch)</h2>
        </div>
      </div>
    </>
  );
}
