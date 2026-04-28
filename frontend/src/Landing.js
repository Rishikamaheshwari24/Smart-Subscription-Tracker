import React from "react";

function Landing({ goToLogin, goToSignup }) {
  return (
    <div className="landing">

      <nav className="landing-nav">
        <h2>💳 SubTracker</h2>

        <div>
          <button onClick={goToLogin}>Login</button>
          <button onClick={goToSignup}>Signup</button>
        </div>
      </nav>

      <div className="hero">
        <h1>Manage Your Subscriptions Smartly 🚀</h1>
        <p>Track expenses, get alerts, and stay in control.</p>

        <button onClick={goToSignup} className="hero-btn">
          Get Started
        </button>
      </div>

    </div>
  );
}

export default Landing;