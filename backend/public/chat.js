// make connection to socket
var socket = io.connect("http://localhost:4000");

var message = document.getElementById("message"); // message
var handle = document.getElementById("handle"); // user
var btn = document.getElementById("send");
var output = document.getElementById("output");

const channel = "tweet:AAPL";

// emit events
btn.addEventListener("click", () => {
  socket.emit(channel, {
    message: message.value,
    user: user.value,
    sentiment: sentiment.value,
  });
});

// listen for events
socket.on(channel, (data) => {
  output.innerHTML +=
    "<p><strong>" +
    data.user +
    ": </strong>" +
    data.message +
    " with " +
    data.sentiment +
    "</p>";
});
