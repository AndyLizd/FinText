const express = require("express");
const router = express.Router();
const tickers = require("../tickersList");

router.get("", (req, res) => {
  res.send(tickers.tickers);
});

module.exports = router;
