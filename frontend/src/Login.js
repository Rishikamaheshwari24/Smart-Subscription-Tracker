import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password
      });

      localStorage.setItem("token", res.data.token);

      navigate("/dashboard");

    } catch (err) {
      console.log(err.response?.data || err.message);
      alert("Login Failed ❌");
    }
  };

  return (
    <div className="auth-container">

      <div className="auth-left"></div>

      <div className="auth-right">
        <div className="auth-card">

          <h2>🔐 Login</h2>

          <input
            placeholder="📧 Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="🔑 Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={handleLogin}>🚀 Login</button>

          <p>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>

        </div>
      </div>

    </div>
  );
}

export default Login;