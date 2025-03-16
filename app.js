const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const walletRoutes = require("./src/routes/walletRoutes");
const cors = require("cors");

dotenv.config();
const app = express();
app.use(express.json()); 

const allowedOrigins = [
    "http://localhost:3000", 
    "http://localhost:3001", 
    "https://pi-wallet-beta.vercel.app"
];

app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin);
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
        res.setHeader("Access-Control-Allow-Credentials", "true");
    }
    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }
    next();
});


mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("DB Connection Error:", err));

app.use("/api/wallet", walletRoutes);

app.use((err, req, res, next) => {
    console.error("Server Error:", err.message);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));