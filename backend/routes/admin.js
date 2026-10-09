const express = require("express");
const jwt = require("jsonwebtoken");
const M = require("../models");

const router = express.Router();

const collections = {
  contacts: M.Contact,
  consultations: M.Consultation,
  "health-checkups": M.HealthCheckup,
  "lead-magnets": M.LeadMagnet,
  applications: M.Application,
};

// Login
router.post("/login", (req, res) => {
  const { email, password } = req.body || {};
  if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
    const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, { expiresIn: "8h" });
    return res.json({ success: true, token });
  }
  res.status(401).json({ success: false, message: "Invalid email or password" });
});

// Auth middleware for everything below
router.use((req, res, next) => {
  const token = (req.headers.authorization || "").replace("Bearer ", "");
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ success: false, message: "Unauthorized" });
  }
});

// Counts
router.get("/stats", async (_req, res, next) => {
  try {
    const entries = await Promise.all(
      Object.entries(collections).map(async ([k, model]) => [k, await model.countDocuments()])
    );
    res.json({ success: true, stats: Object.fromEntries(entries) });
  } catch (e) {
    next(e);
  }
});

// List records
router.get("/:collection", async (req, res, next) => {
  try {
    const model = collections[req.params.collection];
    if (!model) return res.status(404).json({ success: false, message: "Not found" });
    const items = await model.find().sort({ createdAt: -1 }).limit(200).lean();
    res.json({ success: true, items });
  } catch (e) {
    next(e);
  }
});

// Update status
router.patch("/:collection/:id", async (req, res, next) => {
  try {
    const model = collections[req.params.collection];
    const allowed = ["new", "contacted", "closed"];
    if (!model || !allowed.includes(req.body.status)) {
      return res.status(400).json({ success: false, message: "Invalid request" });
    }
    const doc = await model.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    res.json({ success: true, item: doc });
  } catch (e) {
    next(e);
  }
});

module.exports = router;