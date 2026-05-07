import React from "react";
import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing">

      {/* 🔥 NAVBAR */}
      <nav className="landing-nav">
        <h2>💳 SubTracker</h2>

        <div>
          <button onClick={() => navigate("/login")}>
            Login
          </button>

          <button onClick={() => navigate("/signup")}>
            Signup
          </button>
        </div>
      </nav>

      {/* HERO */}
      <div className="hero">
        <h1>Manage Your Subscriptions Smartly 🚀</h1>
        <p>Track expenses, get alerts, and control your money.</p>

        <button onClick={() => navigate("/signup")} className="hero-btn">
          Get Started
        </button>
      </div>

    </div>
  );
}

export default Landing;