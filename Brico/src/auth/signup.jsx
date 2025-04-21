import axios from "axios";
import.meta.env.VITE_API_URL;
import styles from "./signup.module.css";
import { use, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState("");
  const [loading, setloadin] = useState(false);

  let token = localStorage.getItem("token");
  if (token) {
    window.location.href = "/profile";
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setloadin(true);
    seterror("");
    try {
      if (username && email && password) {
        const res = await axios.post(
          `${API_URL}/signup`,
          {
            username,
            useremail: email,
            userpassword: password,
          },
          {
            headers: {
              "Content-Type": "application/json", // Set the content type to JSON
            },
          }
        );

        // If backend returns token as plain string
        if (res.data === "User already exists") {
          seterror("User already exists");
          setusername("");
          setemail("");
          setpassword("");
          setloadin(false);
          return;
        } else {
          localStorage.setItem("token", res.data);

          navigate("/profile");
        }
        console.log(res.data);
      } else {
        seterror("Please fill all fields");
      }
    } catch (err) {
      seterror(err.response?.data || "Signup failed");
      console.log(err);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>Signup</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onInput={(e) => setusername(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onInput={(e) => setemail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onInput={(e) => setpassword(e.target.value)}
          />
          <button type="submit">Sign Up</button>
        </form>
        <p>
          Already have an account?{"   "}
          <b onClick={() => navigate("/login", { replace: true })}>Login</b>
        </p>

        <h3>{error}</h3>
      </div>
    </div>
  );
}
