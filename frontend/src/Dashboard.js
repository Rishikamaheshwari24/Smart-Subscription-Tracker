import React, { useState, useEffect } from "react";
import axios from "axios";

function Dashboard() {
    const [subs, setSubs] = useState([]);

    const [form, setForm] = useState({
        name: "",
        cost: "",
        renewalDate: "",
        category: ""
    });

    const token = localStorage.getItem("token");

    // 📥 GET SUBSCRIPTIONS
    const fetchSubs = async () => {
        try {
            const res = await axios.get(
                "http://localhost:5000/api/subscriptions",
                {
                    headers: { Authorization: token }
                }
            );
            setSubs(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        const savedToken = localStorage.getItem("token");

        if (!savedToken) {
            window.location.href = "/";
            return;
        }

        fetchSubs();
    }, []);

    // ➕ ADD SUBSCRIPTION
    const addSub = async () => {
        try {
            await axios.post(
                "http://localhost:5000/api/subscriptions",
                {
                    name: form.name,
                    cost: Number(form.cost),
                    renewalDate: form.renewalDate,
                    category: form.category
                },
                {
                    headers: { Authorization: token }
                }
            );

            setForm({
                name: "",
                cost: "",
                renewalDate: "",
                category: ""
            });

            fetchSubs();
        } catch (err) {
            console.log(err);
        }
    };

    // 🗑️ DELETE SUBSCRIPTION
    const deleteSub = async (id) => {
        try {
            await axios.delete(
                `http://localhost:5000/api/subscriptions/${id}`,
                {
                    headers: { Authorization: token }
                }
            );

            fetchSubs();
        } catch (err) {
            console.log(err);
        }
    };

    // 💰 TOTAL EXPENSE
    const total = subs.reduce((sum, s) => sum + Number(s.cost), 0);

    return (
        <div className="dashboard">

            <h2 style={{ textAlign: "center" }}>
                Subscription Dashboard 📊
            </h2>

            <h3 style={{ textAlign: "center", color: "green" }}>
                Total Expense: ₹{total}
            </h3>

            {/* FORM */}
            <div className="card2">
                <h3>Add Subscription</h3>

                <input
                    className="input"
                    placeholder="Name"
                    value={form.name}
                    onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                    }
                />

                <input
                    className="input"
                    placeholder="Cost"
                    value={form.cost}
                    onChange={(e) =>
                        setForm({ ...form, cost: e.target.value })
                    }
                />

                <input
                    type="date"
                    className="input"
                    value={form.renewalDate}
                    onChange={(e) =>
                        setForm({ ...form, renewalDate: e.target.value })
                    }
                />

                <input
                    className="input"
                    placeholder="Category"
                    value={form.category}
                    onChange={(e) =>
                        setForm({ ...form, category: e.target.value })
                    }
                />

                <button className="button" onClick={addSub}>
                    Add Subscription
                </button>
            </div>

            {/* LIST */}
            <div className="card2">
                <h3>Your Subscriptions</h3>

                {subs.map((s) => (
                    <div key={s._id} className="sub-item">

                        <div>
                            <strong>{s.name}</strong>

                            <p style={{ margin: 0, fontSize: "12px" }}>
                                {s.category}
                            </p>

                            <p style={{ margin: 0, fontSize: "12px" }}>
                                Renewal: {s.renewalDate}
                            </p>
                        </div>

                        <div style={{ textAlign: "right" }}>
                            <div>₹{s.cost}</div>

                            <button
                                onClick={() => deleteSub(s._id)}
                                style={{
                                    marginTop: "5px",
                                    background: "red",
                                    color: "white",
                                    border: "none",
                                    padding: "5px 10px",
                                    borderRadius: "5px",
                                    cursor: "pointer"
                                }}
                            >
                                Delete
                            </button>
                        </div>

                    </div>
                ))}
            </div>

        </div>
    );
}

export default Dashboard;