const express = require("express");
const socket = require("socket.io");
const WebSocket = require("ws");

const app = express();

const server = app.listen(4000, () => {
  console.log("Listen to Port 4000");
});

app.use(express.static("public"));

// socket for tweet
const io = socket(server);
io.on("connection", (socket) => {
  console.log("make socket connection");

  // socket: the client that sends data
  socket.on("tweet", (data) => {
    // io.sockets: all sockets
    io.sockets.emit("tweet", data);
  });
});

// stock socket
const sentiment = { AAPL: 92.5 };

const stockWS = new WebSocket("wss://ws.finnhub.io?token=c1cftpv48v6scqmqurig");

// Connection opened -> Subscribe
stockWS.addEventListener("open", function (event) {
  stockWS.send(JSON.stringify({ type: "subscribe", symbol: "AAPL" }));
  // stockWS.send(JSON.stringify({ type: "subscribe", symbol: "IC MARKETS:1" }));
});

// Listen for messages
stockWS.addEventListener("message", function (event) {
  try {
    const jsonObj = JSON.parse(event.data);
    const cur = jsonObj.data[0];
    const stock = {
      name: cur.s,
      price: Math.round((cur.p + Number.EPSILON) * 100) / 100,
      time: cur.t,
      sentiment: sentiment[cur.s],
    };
    // console.log("Message from server ", stock);
    io.sockets.emit("stock:AAPL", JSON.stringify(stock));
  } catch (err) {
    console.log("unable to boardcast stock info ", err);
  }
});

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
