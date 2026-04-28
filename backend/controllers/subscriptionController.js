const Subscription = require("../models/Subscription");

// GET
exports.getSubs = async (req, res) => {
  const subs = await Subscription.find();
  res.json(subs);
};

// ADD
exports.addSub = async (req, res) => {
  const sub = new Subscription(req.body);
  await sub.save();
  res.json(sub);
};

// DELETE
exports.deleteSub = async (req, res) => {
  await Subscription.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};

exports.updateSub = async (req, res) => {
  try {
    const updated = await Subscription.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};