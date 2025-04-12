import { Link } from "react-router-dom";

import "./sidebar.css";
export default function Sidbar() {
  return (
    <div className="sidebar">
      <Link to="/" className="cross-btn" replace={true}>
        ❌
      </Link>
      <br />
      <br />
      <br />

      <ul>
        <Link className="link" to="/bricks" replace={true}>
          Bricks calculation
        </Link>
        <Link className="link" to="/slab" replace={true}>
          Slab Estimate
        </Link>
        <Link className="link" to="/cement" replace={true}>
          Cement Plaster
        </Link>
        <Link className="link" to="/tile" replace={true}>
          {" "}
          Tiles Calculation
        </Link>
        <Link className="link" to="/marble" replace={true}>
          {" "}
          Marble Calculation
        </Link>
        <Link className="link" to="/paint" replace={true}>
          {" "}
          Paint Calculation
        </Link>
        <Link className="link" to="/c" replace={true}>
          {" "}
          Ceiling Calculation
        </Link>
      </ul>
    </div>
  );
}
