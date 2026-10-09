const admin = require("./routes/admin");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const forms = require("./routes/forms");

const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL?.split(",") || "*" }));
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (_req, res) => res.json({ success: true, status: "ok" }));
app.use("/api", forms);
app.use("/api/admin", admin);

// 404
app.use((_req, res) => res.status(404).json({ success: false, message: "Not found" }));

// Central error handler
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ success: false, message: "Something went wrong" });
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  });