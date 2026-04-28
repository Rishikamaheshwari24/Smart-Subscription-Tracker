import React from "react";

function Sidebar({ setActivePage, activePage }) {
  const menu = [
  { name: "dashboard", label: "🏠 Dashboard" },
  { name: "analytics", label: "📊 Analytics" },
  { name: "notifications", label: "🔔 Notifications" },
  { name: "profile", label: "👤 Profile" },   // ✅ ADD THIS
  { name: "settings", label: "⚙️ Settings" }
];

  return (
    <div className="sidebar">
      <h2 className="logo">💳 SubTracker</h2>

      {menu.map((item) => (
        <div
          key={item.name}
          className={`menu-item ${
            activePage === item.name ? "active" : ""
          }`}
          onClick={() => setActivePage(item.name)}
        >
          {item.label}
        </div>
      ))}
    </div>
  );
}

export default Sidebar;