import { useState } from "react";
import Header from "../components/Header";
import "./css files/bricks.css";

export default function BricksCalculation() {
  const [length, setLength] = useState("");
  const [height, setHeight] = useState("");
  const [thickness, setThickness] = useState("");
  const [cementRatio, setCementRatio] = useState(450);
  const [sandRatio, setSandRatio] = useState(8);

  const [results, setResults] = useState({
    totalBricksWithWastage: 0,
    cementBags: 0,
    sandVolume: 0,
  });

  const calculateBricks = () => {
    const brickVolume = 0.096; // ft³ (size of standard brick)
    const thicknessInFeet = Number(thickness) / 12;
    const wallVolume = Number(length) * Number(height) * thicknessInFeet;

    const totalBricks = Math.ceil(wallVolume / brickVolume);
    const totalBricksWithWastage = Math.ceil(totalBricks * 1.05);

    const cementBags = Math.ceil(totalBricksWithWastage / Number(cementRatio));
    const sandVolume = cementBags * Number(sandRatio);

    setResults({ totalBricksWithWastage, cementBags, sandVolume });
  };

  return (
    <>
      <Header />

      <div className="calculator-container">
        <h1 className="name">Bricks Calculator 🧱</h1>

        <h2>Wall Length (ft)</h2>
        <input
          type="number"
          value={length}
          onChange={(e) => setLength(e.target.value)}
        />

        <h2>Wall Height (ft)</h2>
        <input
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />

        <h2>Wall Thickness(inches)</h2>
        <input
          type="number"
          value={thickness}
          onChange={(e) => setThickness(e.target.value)}
        />

        <h2>Cement Ratio(Bricks per Bag)</h2>
        <input
          type="number"
          value={cementRatio}
          onChange={(e) => setCementRatio(e.target.value)}
        />

        <h2>Sand Ratio(Cubic Feet per Bag)</h2>
        <input
          type="number"
          value={sandRatio}
          onChange={(e) => setSandRatio(e.target.value)}
        />

        <button onClick={calculateBricks}>Calculate</button>

        <h1>Result</h1>
        <div className="results">
          <p>
            Total Bricks: <strong>{results.totalBricksWithWastage}</strong>
          </p>
          <p>
            Cement Bags Needed: <strong>{results.cementBags}</strong>
          </p>
          <p>
            Sand Required (cubic feet): <strong>{results.sandVolume}</strong>
          </p>
        </div>
      </div>
    </>
  );
}
