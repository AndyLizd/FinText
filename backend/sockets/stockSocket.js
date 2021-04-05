const WebSocket = require("ws");
const config = require("../config");
const { sentiment } = require("../routes/sentiment");

// const sentiment = 92.5;

const setUpStockSocket = (io, stocks) => {
  const stockWS = new WebSocket(
    "wss://ws.finnhub.io?token=" + config.stockApiKey
  );

  // Connection opened -> Subscribe
  stockWS.addEventListener("open", function (event) {
    for (stockId of stocks) {
      stockWS.send(JSON.stringify({ type: "subscribe", symbol: stockId }));
    }
  });

  // Listen for messages
  stockWS.addEventListener("message", function (event) {
    try {
      const updates = JSON.parse(event.data).data;
      for (cur of updates) {
        const curSentiment = sentiment.find((stock) => stock.id === cur.s).cur;
        const stock = {
          name: cur.s,
          price: Number.parseFloat(cur.p).toFixed(2),
          time: cur.t,
          sentiment: Number.parseFloat(curSentiment).toFixed(1),
        };
        const elem = sentiment.find((stock) => stock.id === cur.s);
        // console.log(elem.id, elem.cur);
        io.sockets.emit("stock:" + cur.s, JSON.stringify(stock));
      }
    } catch (err) {
      console.log("unable to boardcast stock info ", err);
    }
  });
};

// // Unsubscribe
// var unsubscribe = function (symbol) {
//   stockWS.send(JSON.stringify({ type: "unsubscribe", symbol: symbol }));
// };

// // testing
// function updateStock() {
//   // change it to {name: 'APPL', price: xxx} later
//   data = {
//     AAPL: {
//       name: "AAPL",
//       price: Math.round(Math.random() * 20),
//     },
//   };
//   io.sockets.emit("stock", data);
//   // console.log("emit stock price", data.APPL.price);
// }
// setInterval(updateStock, 3 * 1000);

module.exports = setUpStockSocket;
