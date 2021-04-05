const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

const config = require("../config");

const times = {
  day: { offset: 24 * 3600, resolution: "15" },
  month: { offset: 24 * 3600 * 30, resolution: "60" },
  year: { offset: 24 * 3600 * 365, resolution: "W" },
};

router.get("/id/:id/duration/:duration", (req, res) => {
  const { id, duration } = req.params;
  console.log("id: ", id, "duration: ", duration);

  const resolution = times[duration].resolution;
  const curTime = new Date();
  let weekendOffset = 0;
  if (duration == "day") {
    switch (curTime.getDay()) {
      case 0:
        weekendOffset = 2 * 24 * 3600;
        break;
      case 6:
        weekendOffset = 24 * 3600;
        break;
      default:
        weekendOffset = 0;
    }
  }
  const endTime = Math.floor(curTime.getTime() / 1000 - weekendOffset);
  const startTime = Math.floor(endTime - times[duration].offset);

  const url =
    "https://finnhub.io/api/v1/stock/candle?symbol=" +
    id +
    "&resolution=" +
    resolution +
    "&from=" +
    startTime +
    "&to=" +
    endTime +
    "&token=" +
    config.stockApiKey;

  // console.log("url: ", url);

  try {
    fetch(url)
      .then((response) => response.json())
      // .then((prices) => prices.o)
      .then((prices) => res.send(prices));
  } catch (err) {
    console.log("Fail to fetch data from Finnhub backend", err);
    res.status(500).send("Fail to fetch data from Finnhub backend");
  }
});

module.exports = router;
