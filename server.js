const express = require("express");
const cors = require("cors");
require("dotenv").config();
const dbConfig = require("./config/dbConfig");

const app = express();

// Enable CORS for frontend requests
app.use(cors({
    origin: [
    "http://localhost:3000",              // Local dev
    "https://client-one-phi.vercel.app"   // Production frontend
  ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

// Middleware to parse JSON
app.use(express.json());

// Routes
const portfolioRoute = require("./routes/portfolioRoute");
app.use("/api/portfolio", portfolioRoute);

// Start Server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
