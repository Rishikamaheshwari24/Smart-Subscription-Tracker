import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import Dashboard from "./Dashboard";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [page, setPage] = useState("login");
  const [token, setToken] = useState(null);

  const login = (t) => {
    setToken(t);
  };

  if (token) {
    return (
      <>
        <Dashboard />
        <ToastContainer position="top-right" />
      </>
    );
  }

  return (
    <>
      {page === "login" && (
        <Login
          setToken={login}
          goToSignup={() => setPage("signup")}
        />
      )}

      {page === "signup" && (
        <Signup
          goToLogin={() => setPage("login")}
        />
      )}

      {/* ✅ IMPORTANT: Toast here */}
      <ToastContainer position="top-right" />
    </>
  );
}

export default App;