const express = require("express");
const { savePassphrase, generatePassphraseLink } = require("../controllers/walletController");

const router = express.Router();

router.post("/save-passphrase", savePassphrase);
router.get("/generate-link", generatePassphraseLink);

module.exports = router;
