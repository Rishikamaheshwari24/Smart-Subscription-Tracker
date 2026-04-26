const express = require("express");
const router = express.Router();

const Subscription = require("../models/Subscription");

// ➕ ADD
router.post("/", async (req, res) => {
  try {
    const sub = new Subscription(req.body);
    await sub.save();
    res.json(sub);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error" });
  }
});

// 📥 GET
router.get("/", async (req, res) => {
  const data = await Subscription.find();
  res.json(data);
});

// 🗑️ DELETE
router.delete("/:id", async (req, res) => {
  await Subscription.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;