function Navbar() {
  return (
    <div className="navbar">
      <h2>💳 SubTracker</h2>

      <button onClick={() => {
        localStorage.removeItem("token");
        window.location.href = "/";
      }}>
        🚪 Logout
      </button>
    </div>
  );
}