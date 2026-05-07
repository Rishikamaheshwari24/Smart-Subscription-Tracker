import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate(); // ✅ FIX

  const handleSignup = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/signup", {
        name,
        email,
        password
      });

      alert("Signup Successful ✅");

      // ✅ redirect to login page
      navigate("/login");

    } catch (err) {
      alert("Signup Failed ❌");
    }
  };

  return (
    <div className="auth-container">

      {/* LEFT IMAGE */}
      <div className="auth-left"></div>

      {/* RIGHT FORM */}
      <div className="auth-right">
        <div className="auth-card">

          <h2>📝 Signup</h2>

          <input
            placeholder="👤 Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

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

          <button onClick={handleSignup}>
            🚀 Signup
          </button>

          {/* ✅ Link instead of function */}
          <p>
            Already have an account?{" "}
            <Link to="/login">Login</Link>
          </p>

        </div>
      </div>

    </div>
  );
}

export default Signup;