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

// 🎯 EMOJI
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

    const [darkMode, setDarkMode] = useState(true);
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

    // 📥 FETCH
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
    const notifications = subs.filter((s) => {
        const today = new Date();
        const renewal = new Date(s.renewalDate);

        const diff = Math.ceil(
            (renewal - today) / (1000 * 60 * 60 * 24)
        );

        return diff >= 0 && diff <= 5;
    });

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
                toast.success("Updated ✏️");
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
                toast.success("Added ✅");
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
            toast.error("Failed ❌");
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

    const total = subs.reduce((sum, s) => sum + Number(s.cost), 0);

    const filteredSubs = subs.filter((s) =>
        s.name.toLowerCase().includes(search.toLowerCase())
    );

    const chartData = subs.map((s) => ({
        name: s.name,
        cost: s.cost
    }));

    return (
        <div className={darkMode ? "dark" : "light"}>

            <div className="dashboard-layout">

                {/* SIDEBAR */}
                <Sidebar setActivePage={setActivePage} activePage={activePage} />

                {/* MAIN */}
                <div className="main-content">

                    {/* 🔥 TOP NAVBAR */}
                    <div className="topbar">

                        <h2>📊 Dashboard</h2>

                        <div className="topbar-right">

                            {/* 🌙 THEME */}
                            <button
                                className="toggle-btn"
                                onClick={() => setDarkMode(!darkMode)}
                            >
                                {darkMode ? "🌙" : "☀️"}
                            </button>

                            {/* 👤 PROFILE */}
                            <div
                                className="avatar"
                                onClick={() => setActivePage("profile")}
                            >
                                👤
                            </div>

                        </div>
                    </div>

                    {/* ================= DASHBOARD ================= */}
                    {activePage === "dashboard" && (
                        <>
                            <div className="stats">
                                <div className="stat-card">
                                    <h4>Total Expense</h4>
                                    <h2>₹{total}</h2>
                                </div>

                                <div className="stat-card">
                                    <h4>Subscriptions</h4>
                                    <h2>{subs.length}</h2>
                                </div>

                                <div className="stat-card">
                                    <h4>Alerts</h4>
                                    <h2>{notifications.length}</h2>
                                </div>
                            </div>

                            <div className="search-box">
                                <input
                                    placeholder="🔍 Search..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>

                            <div className="card2">
                                <h3>{form._id ? "✏️ Edit" : "➕ Add"}</h3>

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

                            <div className="card2">
                                <h3 className="section-title">💳 Your Subscriptions</h3>

                                <div className="subs-grid">
                                    {filteredSubs.map((s) => {
                                        const date = new Date(s.renewalDate);

                                        const daysLeft = Math.ceil(
                                            (date - new Date()) / (1000 * 60 * 60 * 24)
                                        );

                                        return (
                                            <div key={s._id} className="sub-card">

                                                {/* TOP */}
                                                <div className="sub-top">
                                                    <h4>
                                                        {getEmoji(s.category)} {s.name}
                                                    </h4>

                                                    <span className={
                                                        daysLeft <= 5 ? "badge warning" : "badge success"
                                                    }>
                                                        {daysLeft <= 5 ? "Expiring Soon" : "Active"}
                                                    </span>
                                                </div>

                                                {/* DETAILS */}
                                                <p className="sub-category">{s.category}</p>

                                                <p className="sub-date">
                                                    Renewal:{" "}
                                                    {date.toLocaleDateString("en-IN", {
                                                        day: "2-digit",
                                                        month: "short",
                                                        year: "numeric"
                                                    })}
                                                </p>

                                                {/* PRICE */}
                                                <h3 className="sub-price">₹{s.cost}</h3>

                                                {/* ACTIONS */}
                                                <div className="sub-actions">
                                                    <button onClick={() => handleEdit(s)}>✏️ Edit</button>
                                                    <button onClick={() => deleteSub(s._id)}>🗑️ Delete</button>
                                                </div>

                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </>
                    )}

                    {/* ================= ANALYTICS ================= */}
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

                    {/* ================= PROFILE ================= */}
                    {activePage === "profile" && (
                        <div className="card2 profile-card">
                            <h2>👤 Profile</h2>

                            <p><strong>Email:</strong> user@gmail.com</p>
                            <p>📦 {subs.length} Subscriptions</p>
                            <p>💰 ₹{total}</p>

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

                    {/* ================= SETTINGS ================= */}
                    {activePage === "settings" && (
                        <div className="card2">
                            <h2>⚙️ Settings</h2>

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

                </div>
            </div>
        </div>
    );
}

export default Dashboard;