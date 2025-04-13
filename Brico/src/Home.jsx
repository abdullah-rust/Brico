import Header from "./components/Header";
import { useNavigate } from "react-router-dom";
import Footer from "./components/Fotter";
import "./App.css";

export default function Home() {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <div className="home">
        <div
          style={{
            padding: "20px",
            textAlign: "center",
            color: "white",
          }}
        >
          <h1
            style={{
              fontSize: "3rem",
              marginBottom: "20px",
            }}
          >
            Welcome to Brico
          </h1>

          <p
            style={{
              fontSize: "1.5rem",
              lineHeight: "1.6",
              maxWidth: "800px",
              margin: "0 auto",
            }}
          >
            Your complete construction calculation companion. We provide
            easy-to-use tools for all your construction needs including:
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "20px",
              margin: "30px auto",
              maxWidth: "900px",
            }}
          >
            <div
              style={{
                background: "rgba(255,255,255,0.1)",
                padding: "20px",
                borderRadius: "10px",
                width: "250px",
              }}
              onClick={() => navigate("/bricks")}
            >
              <h3>🧱 Bricks Calculator</h3>
              <p>Calculate exact brick requirements for your walls</p>
            </div>

            <div
              style={{
                background: "rgba(255,255,255,0.1)",
                padding: "20px",
                borderRadius: "10px",
                width: "250px",
              }}
              onClick={() => navigate("/slab")}
            >
              <h3>🏗️ Slab Estimate</h3>
              <p>Get precise slab measurements and material estimates</p>
            </div>

            <div
              style={{
                background: "rgba(255,255,255,0.1)",
                padding: "20px",
                borderRadius: "10px",
                width: "250px",
              }}
              onClick={() => navigate("/side")}
            >
              <h3>🎨 More Tools</h3>
              <p>Cement, tiles, marble and paint calculations</p>
            </div>
          </div>

          <p
            style={{
              fontSize: "1.2rem",
              fontStyle: "italic",
            }}
          >
            Start your construction project with confidence using our precise
            calculation tools!
          </p>
          <br />
          <br />
          <br />
          <br />
          <br />
          <Footer />
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
      </div>
    </>
  );
}
