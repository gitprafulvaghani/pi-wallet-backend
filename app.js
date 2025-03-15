const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const walletRoutes = require("./src/routes/walletRoutes");
const cors = require("cors");


dotenv.config();
const app = express();
app.use(express.json()); // Body parser


// Enable CORS for frontend (http://localhost:3000)
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// Handle Preflight Requests for CORS
app.options("*", cors());


// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("DB Connection Error:", err));

// Routes
app.use("/api/wallet", walletRoutes);

// Start Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
