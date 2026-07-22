require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require('./routes/authRoutes');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
aapp.use(express.urlencoded({ extended: true }));
app.use('/api/auth', authRoutes);


// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});