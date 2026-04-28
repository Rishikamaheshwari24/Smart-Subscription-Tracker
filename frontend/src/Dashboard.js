import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";
import Sidebar from "./components/Sidebar";
import { toast } from "react-toastify";

// 🔔 EXPIRY CHECK
const isExpiringSoon = (date) => {
    if (!date) return false;

    const today = new Date();
    const renewal = new Date(date);

    const diff = Math.ceil(
        (renewal - today) / (1000 * 60 * 60 * 24)
    );

    return diff >= 0 && diff <= 5;
};

// 🎯 CATEGORY EMOJI
const getEmoji = (category) => {
    switch (category?.toLowerCase()) {
        case "entertainment": return "🎬";
        case "music": return "🎧";
        case "education": return "📚";
        case "shopping": return "🛒";
        case "fitness": return "💪";
        default: return "💳";
    }
};

function Dashboard() {

    // 🌙 DARK MODE
    const [darkMode, setDarkMode] = useState(true);

    // 📄 PAGE CONTROL
    const [activePage, setActivePage] = useState("dashboard");

    const [subs, setSubs] = useState([]);
    const [search, setSearch] = useState("");

    const [form, setForm] = useState({
        name: "",
        cost: "",
        renewalDate: "",
        category: ""
    });

    const token = localStorage.getItem("token");

    // 📥 FETCH DATA
    const fetchSubs = async () => {
        try {
            const res = await axios.get(
                "http://localhost:5000/api/subscriptions",
                { headers: { Authorization: token } }
            );
            setSubs(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (!token) {
            window.location.href = "/";
            return;
        }
        fetchSubs();
    }, []);

    // 🔔 NOTIFICATIONS
    const getNotifications = () => {
        const today = new Date();

        return subs.filter((s) => {
            const renewal = new Date(s.renewalDate);
            const diff = Math.ceil(
                (renewal - today) / (1000 * 60 * 60 * 24)
            );
            return diff >= 0 && diff <= 5;
        });
    };

    const notifications = getNotifications();

    // ✏️ EDIT
    const handleEdit = (sub) => {
        setForm({
            _id: sub._id,
            name: sub.name,
            cost: sub.cost,
            renewalDate: sub.renewalDate?.split("T")[0],
            category: sub.category
        });

        setActivePage("dashboard");
    };

    // ➕ ADD / UPDATE
    const addSub = async () => {
        try {
            if (form._id) {
                await axios.put(
                    `http://localhost:5000/api/subscriptions/${form._id}`,
                    {
                        name: form.name,
                        cost: Number(form.cost),
                        renewalDate: form.renewalDate,
                        category: form.category
                    },
                    {
                        headers: {
                            Authorization: token,
                            "Content-Type": "application/json"
                        }
                    }
                );

                toast.success("Updated Successfully ✏️");

            } else {
                await axios.post(
                    "http://localhost:5000/api/subscriptions",
                    {
                        name: form.name,
                        cost: Number(form.cost),
                        renewalDate: form.renewalDate,
                        category: form.category
                    },
                    {
                        headers: {
                            Authorization: token,
                            "Content-Type": "application/json"
                        }
                    }
                );

                toast.success("Added Successfully ✅");
            }

            setForm({
                name: "",
                cost: "",
                renewalDate: "",
                category: ""
            });

            fetchSubs();

        } catch (err) {
            console.log(err);
            toast.error("Update failed ❌");
        }
    };

    // 🗑️ DELETE
    const deleteSub = async (id) => {
        try {
            await axios.delete(
                `http://localhost:5000/api/subscriptions/${id}`,
                { headers: { Authorization: token } }
            );
            fetchSubs();
            toast.info("Deleted 🗑️");
        } catch (err) {
            console.log(err);
        }
    };

    // 💰 TOTAL
    const total = subs.reduce((sum, s) => sum + Number(s.cost), 0);

    // 🔍 SEARCH
    const filteredSubs = subs.filter((s) =>
        s.name.toLowerCase().includes(search.toLowerCase())
    );

    // 📊 CHART DATA
    const chartData = subs.map((s) => ({
        name: s.name,
        cost: s.cost
    }));

    return (
        <div className={darkMode ? "dark" : "light"}>

            <div className="dashboard-layout">
                {activePage === "profile" && (
                    <div className="profile-card">

                        <div className="profile-header">
                            <div className="avatar">👤</div>
                            <h2>User Profile</h2>
                            <p>user@gmail.com</p>
                        </div>

                        <div className="profile-stats">
                            <div className="stat-box">
                                <h3>📦 {subs.length}</h3>
                                <p>Subscriptions</p>
                            </div>

                            <div className="stat-box">
                                <h3>💰 ₹{total}</h3>
                                <p>Total Spend</p>
                            </div>
                        </div>

                        <button
                            className="logout-btn"
                            onClick={() => {
                                localStorage.removeItem("token");
                                window.location.href = "/";
                            }}
                        >
                            🚪 Logout
                        </button>

                    </div>
                )}

                {/* 🌙 DARK TOGGLE */}
                <div className="top-bar">
                    <button
                        className="theme-btn"
                        onClick={() => setDarkMode(!darkMode)}
                    >
                        {darkMode ? "🌙" : "☀️"}
                    </button>
                </div>

                {/* ✅ SIDEBAR */}
                <Sidebar
                    setActivePage={setActivePage}
                    activePage={activePage}
                />

                {/* ✅ MAIN CONTENT */}
                <div className="main-content">

                    {/* 📊 DASHBOARD */}
                    {activePage === "dashboard" && (
                        <>
                            <h2>📊 Dashboard</h2>

                            <h3>💰 ₹{total}</h3>
                            <h3>📦 {subs.length} Subscriptions</h3>

                            {/* 🔍 SEARCH */}
                            <div className="search-box">
                                <input
                                    placeholder="🔍 Search..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>

                            {/* FORM */}
                            <div className="card2">
                                <h3>
                                    {form._id ? "✏️ Edit" : "➕ Add"}
                                </h3>

                                <input className="input" placeholder="Name"
                                    value={form.name}
                                    onChange={(e) =>
                                        setForm({ ...form, name: e.target.value })}
                                />

                                <input className="input" placeholder="Cost"
                                    value={form.cost}
                                    onChange={(e) =>
                                        setForm({ ...form, cost: e.target.value })}
                                />

                                <input type="date" className="input"
                                    value={form.renewalDate}
                                    onChange={(e) =>
                                        setForm({ ...form, renewalDate: e.target.value })}
                                />

                                <input className="input" placeholder="Category"
                                    value={form.category}
                                    onChange={(e) =>
                                        setForm({ ...form, category: e.target.value })}
                                />

                                <button className="button" onClick={addSub}>
                                    {form._id ? "Update" : "Add"}
                                </button>
                            </div>

                            {/* LIST */}
                            <div className="card2">
                                <h3>Your Subscriptions</h3>

                                {filteredSubs.map((s) => (
                                    <div key={s._id} className="sub-item">

                                        <div>
                                            <strong>
                                                {getEmoji(s.category)} {s.name}
                                            </strong>

                                            <p>{s.category}</p>
                                            <p>Renewal: {s.renewalDate}</p>

                                            {isExpiringSoon(s.renewalDate) && (
                                                <p style={{ color: "yellow" }}>
                                                    ⚠ Expiring Soon
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            ₹{s.cost}<br />

                                            <button onClick={() => handleEdit(s)}>✏️</button>
                                            <button onClick={() => deleteSub(s._id)}>🗑️</button>
                                        </div>

                                    </div>
                                ))}
                            </div>
                        </>
                    )}

                    {/* 📊 ANALYTICS */}
                    {activePage === "analytics" && (
                        <div className="card2">
                            <h2>📊 Analytics</h2>

                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={chartData}>
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="cost" />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    )}

                    {/* 🔔 NOTIFICATIONS */}
                    {activePage === "notifications" && (
                        <div className="card2">
                            <h2>🔔 Notifications</h2>

                            {notifications.length === 0
                                ? <p>No upcoming expiries 🎉</p>
                                : notifications.map(n => (
                                    <p key={n._id}>⚠ {n.name} expiring soon</p>
                                ))
                            }
                        </div>
                    )}

                    {/* ⚙️ SETTINGS */}
                    {activePage === "settings" && (
                        <div className="card2">
                            <h2>⚙️ Settings</h2>

                            <button
                                onClick={() => {
                                    localStorage.removeItem("token");
                                    window.location.href = "/";
                                }}
                            >
                                🚪 Logout
                            </button>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}

export default Dashboard;