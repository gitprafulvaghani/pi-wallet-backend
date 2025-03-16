const Wallet = require("../models/Wallet");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const savePassphrase = async (req, res) => {
    try {
        const { token } = req.query;
        const { passphrase } = req.body;
        if (!token || !passphrase) {
            return res.status(400).json({ message: "Token and passphrase are required" });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            return res.status(401).json({ message: "Invalid or expired token" });
        }

        if (!decoded.userId) {
            return res.status(400).json({ message: "Invalid token: Missing userId" });
        }

        const newWallet = new Wallet({ userId: decoded.userId, passphrase });
        await newWallet.save();

        res.json({ message: "Passphrase saved successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};



const generatePassphraseLink = async (req, res) => {
    try {
        const userId = crypto.randomUUID();

        if (!process.env.JWT_SECRET) {
            return res.status(500).json({ message: "JWT_SECRET is missing in .env" });
        }


        const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "2h" });

        const BASE_URL = process.env.FRONTEND_BASE_URL || "https://pi-wallet-one.vercel.app";

        const link = `${BASE_URL}/unlock-wallet?token=${token}`;

        res.json({
            message: "Link generated successfully",
            link,
            expiresAt: new Date(Date.now() + 2 * 60 * 60 * 1000) 
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

module.exports = { savePassphrase, generatePassphraseLink };
