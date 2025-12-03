require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cron = require("node-cron");
const axios = require("axios");

// Import Routes
const ingestRoutes = require("./routes/ingestRoutes");
const tenantRoutes = require("./routes/tenant");

const app = express();

app.use(express.json());
app.use(cors());

// -------------------------------
// ROUTES
// -------------------------------
app.use("/ingest", ingestRoutes);
app.use("/tenant", tenantRoutes);

// Root test route
app.get("/", (req, res) => {
  res.send("🚀 Xeno Backend Running!");
});

// -------------------------------
// START SERVER
// -------------------------------
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on ${PORT}`);
});

// -------------------------------
// CRON JOB → Auto Sync Every 1 Hour
// -------------------------------
cron.schedule("* * * * *", async () => {
  console.log("⏳ Auto-Sync started...");

  try {
    await axios.get("http://localhost:4000/ingest/save/customers");
    await axios.get("http://localhost:4000/ingest/save/products");
    await axios.get("http://localhost:4000/ingest/save/orders");

    console.log("✅ Auto-Sync finished!");
  } catch (err) {
    console.log("❌ Auto-Sync failed:", err.message);
  }
});
