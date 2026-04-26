import React, { useState } from "react";
import axios from "axios";

function Signup({ goToLogin }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleSignup = async (e) => {
    e.preventDefault(); // 🔥 important fix

    try {
      await axios.post("http://localhost:5000/api/auth/signup", form);

      alert("Signup successful 🎉");

      // go back to login page
      goToLogin();

    } catch (err) {
      alert("Signup failed ❌");
      console.log(err);
    }
  };

  return (
    <div className="container">

      <form className="card" onSubmit={handleSignup}>

        <h2 className="title">Create Account 🧾</h2>

        <input
          className="input"
          placeholder="Name"
          required
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          className="input"
          placeholder="Email"
          required
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          className="input"
          type="password"
          placeholder="Password"
          required
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button className="button" type="submit">
          Signup
        </button>

        <button
          type="button"
          onClick={goToLogin}
          style={{
            marginTop: "10px",
            background: "transparent",
            border: "none",
            color: "blue",
            cursor: "pointer"
          }}
        >
          Already have account? Login
        </button>

      </form>

    </div>
  );
}

export default Signup;