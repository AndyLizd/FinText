const express = require("express");
const router = express.Router();
const stocksTickers = require("../tickersList").tickers;

const windowSize = 50;
const alpha = 0.2; // update weight

const randomWalk = (num) => {
  const bound = [40, 60];

  const seq = [];
  let cur = Math.random();
  for (let i = 0; i < num; i++) {
    cur += 2 * (Math.random() - 0.5);
    seq.push(cur);
  }

  const maxV = Math.max(...seq);
  const minV = Math.min(...seq);
  const preturb = (Math.random() - 0.5) * bound[0];

  return seq.map(
    (val) => (val / (maxV - minV)) * (bound[1] - bound[0]) + bound[0] + preturb
  );
};

const initSentiment = () =>
  stocksTickers.map((ticker) => {
    const history = randomWalk(30);
    const bullCount = Math.round(
      (history[history.length - 1] / 100) * windowSize
    );
    const bearCount = windowSize - bullCount;

    const elem = {
      id: ticker,
      cur: history[history.length - 1],
      bullCount: bullCount,
      bearCount: bearCount,
      count: 0,
      rotate: true,
      history: history,
    };
    return elem;
  });

const sentiment = initSentiment();

router.get("/id/:id", (req, res) => {
  const stock = sentiment.find((stock) => stock.id === req.params.id);
  const result = (({ id, cur, history }) => ({ id, cur, history }))(stock);
  res.send(result);
});

router.put("/id/:id/sentiment/:sentiment", (req, res) => {
  const stock = sentiment.find((stock) => stock.id === req.params.id);
  if (req.params.sentiment == "BULL") stock.bullCount++;
  else if (req.params.sentiment == "BEAR") stock.bearCount++;

  stock.cur = (stock.bullCount / (stock.bearCount + stock.bullCount)) * 100;

  if (stock.rotate && stock.bullCount != 0) {
    stock.bullCount--;
  } else {
    stock.bearCount--;
  }

  stock.rotate = !stock.rotate;

  stock.count++;
  if (stock.count >= windowSize) {
    stock.history.push(stock.cur);
    stock.count = 0;
  }

  res.send(stock);
});

module.exports = { router, sentiment };
