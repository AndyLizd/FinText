const express = require("express");
const socket = require("socket.io");
const app = express();

const priceHistory = require("./routes/priceHistory");
const { router: sentimentApi } = require("./routes/sentiment");
const tickers = require("./routes/tickers");
const setUpTweetSocket = require("./sockets/tweetSocket");
const setUpStockSocket = require("./sockets/stockSocket");

app.use(express.json());

const server = app.listen(4000, () => {
  console.log("Listen to Port 4000");
});
app.use(express.static("public"));

const stocks = ["AAPL", "AMZN", "TSLA"];

// RESTful API
app.use("/api/priceHistory", priceHistory);
app.use("/api/sentiment", sentimentApi);
app.use("/api/tickers", tickers);

// Socket API
const io = socket(server);
for (const stockId of stocks) {
  setUpTweetSocket(io, stockId);
}

setUpStockSocket(io, stocks);
