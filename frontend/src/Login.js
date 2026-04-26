import React, { useState } from "react";
import axios from "axios";

function Login({ setToken, goToSignup }) {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post(
      "http://localhost:5000/api/auth/login",
      {
        email: form.email,
        password: form.password
      }
    );

    localStorage.setItem("token", res.data.token);
    setToken(res.data.token);

  } catch (err) {
    console.log("Login error");
  }
};

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="card">

        <h2 className="title">Welcome Back 👋</h2>

        {/* EMAIL */}
        <input
          className="input"
          type="email"
          placeholder="Email"
          required
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        {/* PASSWORD */}
        <input
          type="password"
          className="input"
          placeholder="Password"
          required
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        {/* LOGIN BUTTON */}
        <button className="button" type="submit">
          Login
        </button>

        {/* SIGNUP SWITCH */}
        <button
          type="button"
          onClick={goToSignup}
          style={{
            marginTop: "10px",
            background: "transparent",
            border: "none",
            color: "blue",
            cursor: "pointer"
          }}
        >
          Create Account
        </button>

      </form>
    </div>
  );
}

export default Login;