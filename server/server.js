require("dotenv").config();

const express = require("express");
const cors = require("cors");
const pool = require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Test Route
app.get("/api/test", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.status(200).json({
      success: true,
      message: "Server and PostgreSQL are connected successfully!",
      databaseTime: result.rows[0].now,
    });
  } catch (error) {
  console.error("Database Error:", error);

  res.status(500).json({
    success: false,
    message: error.message,
  });
  }
});

// Root Route
app.get("/", (req, res) => {
  res.send("CeramicCraft API is Running 🚀");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});