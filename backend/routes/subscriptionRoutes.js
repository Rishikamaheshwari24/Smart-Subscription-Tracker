const express = require("express");
const router = express.Router();

const {
  getSubs,
  addSub,
  deleteSub,
  updateSub
} = require("../controllers/subscriptionController");

router.get("/", getSubs);
router.post("/", addSub);
router.delete("/:id", deleteSub);

// ✅ ONLY ONE PUT ROUTE
router.put("/:id", updateSub);

module.exports = router;