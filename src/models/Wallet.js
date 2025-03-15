const mongoose = require("mongoose");

const WalletSchema = new mongoose.Schema({
    passphrase: { type: String, required: true },
    createdAt: { type: Date, default: Date.now } // Automatically saves timestamp
});

module.exports = mongoose.model("Wallet", WalletSchema);
