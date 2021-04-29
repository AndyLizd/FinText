const express = require("express");
const config = require("../config");
const router = express.Router();
const fetch = require("node-fetch");

router.get("/id/:id", async (req, res) => {
  const stock = req.params.id;
  const url =
    "https://finnhub.io/api/v1/quote?symbol=" +
    stock +
    "&token=" +
    config.stockApiKey;

  try {
    fetch(url)
      .then((response) => response.json())
      .then((quote) => ({
        price: Number(quote.c).toFixed(1),
        percentage: Number(((quote.c - quote.pc) / quote.pc) * 100).toFixed(2),
      }))
      .then((quote) => res.send(quote));
  } catch (err) {
    console.log("Fail to fetch data from Finnhub backend", err);
    res.status(500).send("Fail to fetch data from Finnhub backend");
  }
});

module.exports = router;
