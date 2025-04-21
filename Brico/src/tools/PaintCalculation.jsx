import Header from "../components/Header";
import { useState } from "react";

export default function PaintCalculation() {
  const [length, setLength] = useState(0);
  const [height, setHeight] = useState(0);
  const [walls, setWalls] = useState(1);
  const [coverage, setCoverage] = useState(80); // sqft per liter default
  const [coats, setCoats] = useState(2);
  const [areaFeet, setAreaFeet] = useState(0);
  const [paintLiters, setPaintLiters] = useState(0);
  const [paintGallons, setPaintGallons] = useState(0);

  const calculate = () => {
    const wallAreaFt = length * height * walls;
    const paintLtr = (wallAreaFt * coats) / coverage;
    const paintGal = paintLtr / 3.785;

    setAreaFeet(wallAreaFt.toFixed(2));
    setPaintLiters(paintLtr.toFixed(2));
    setPaintGallons(paintGal.toFixed(2));
  };

  return (
    <>
      <Header />
      <div className="container ">
        <h1 className="text-xl font-bold mb-4">Paint Calculator 🎨</h1>

        <div className="input">
          <h2>Wall Length (ft) </h2>
          <input
            type="number"
            // placeholder="Wall Length (ft)"
            className="border p-2"
            onChange={(e) => setLength(parseFloat(e.target.value))}
          />
          <h2>Wall Height (ft)</h2>
          <input
            type="number"
            // placeholder="Wall Height (ft)"
            className="border p-2"
            onChange={(e) => setHeight(parseFloat(e.target.value))}
          />
          <h2>Number of Walls</h2>
          <input
            type="number"
            // placeholder="Number of Walls"
            className="border p-2"
            onChange={(e) => setWalls(parseInt(e.target.value))}
          />
          <h2>Coverage per liter (sqft)</h2>
          <input
            type="number"
            // placeholder="Coverage per liter (sqft)"
            className="border p-2"
            defaultValue={80}
            onChange={(e) => setCoverage(parseFloat(e.target.value))}
          />
          <h2>Number of Coats</h2>
          <input
            type="number"
            // placeholder="Number of Coats"
            className="border p-2"
            defaultValue={2}
            onChange={(e) => setCoats(parseFloat(e.target.value))}
          />
        </div>

        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
          onClick={calculate}
        >
          Calculate
        </button>

        <div className="result">
          <p>
            <strong>Total Wall Area (sqft):</strong> {areaFeet}
          </p>
          <p>
            <strong>Paint Required (liters):</strong> {paintLiters}
          </p>
          <p>
            <strong>Paint Required (gallons):</strong> {paintGallons}
          </p>
        </div>
      </div>
    </>
  );
}
