import Header from "../components/Header";
import { useState } from "react";
import manuIcon from "../assets/tile.png";

export default function TileCalculation() {
  const [length, setLength] = useState(0);
  const [width, setWidth] = useState(0);
  const [areaFeet, setAreaFeet] = useState(0);
  const [areaMeter, setAreaMeter] = useState(0);

  const calculate = () => {
    const areaFt = length * width;
    const areaM = areaFt * 0.092903; // sqft to square meter

    setAreaFeet(areaFt.toFixed(2));
    setAreaMeter(areaM.toFixed(2));
  };

  return (
    <>
      <Header />
      <div className="container">
        <h1 className="text-xl font-bold mb-4">
          {" "}
          Tiles Area Calculator{" "}
          <img src={manuIcon} alt="icon" className="icon" />
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
        </div>

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={calculate}
        >
          Calculate
        </button>

        <div className="result">
          <p>
            <strong>Area (sqft):</strong> {areaFeet}
          </p>
          <p>
            <strong>Area (sqm):</strong> {areaMeter}
          </p>
        </div>
      </div>
    </>
  );
}

// TileCalculation()
