const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// 🔐 Middleware
app.use(cors());
app.use(express.json());

// 📌 Routes
const authRoutes = require("./routes/authRoutes");
const subscriptionRoutes = require("./routes/subscriptionRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/subscriptions", subscriptionRoutes);

// 🧪 Test Route
app.get("/", (req, res) => {
  res.send("Server running 🚀");
});

// 🔗 DB Connection (better version)
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log("DB Error ❌", err));

// 🚀 Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});