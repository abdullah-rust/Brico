import { Link, replace } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "./sidebar.css";
export default function Sidbar() {
  let navigate = useNavigate();
  return (
    <div className="sidebar">
      <div
        className="cross-btn"
        onClick={() => navigate(-1, { replace: true })}
      >
        ❌
      </div>
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

        <button onClick={() => navigate("/contact", { replace: true })}>
          {" "}
          feedback please{" "}
        </button>
      </ul>
    </div>
  );
}
