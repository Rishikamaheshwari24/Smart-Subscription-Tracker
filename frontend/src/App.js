import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import Dashboard from "./Dashboard";

function App() {
  const [page, setPage] = useState("login");
  const [token, setToken] = useState(null);

  const login = (t) => {
    setToken(t);
  };

  if (token) {
    return <Dashboard />;
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
    </>
  );
}

export default App;