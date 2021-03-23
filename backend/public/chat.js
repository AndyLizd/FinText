// make connection to socket
var socket = io.connect("http://localhost:4000");

var message = document.getElementById("message"); // message
var handle = document.getElementById("handle"); // user
var btn = document.getElementById("send");
var output = document.getElementById("output");

// emit events
btn.addEventListener("click", () => {
  socket.emit("tweet", {
    message: message.value,
    handle: handle.value,
  });
});

// listen for events
socket.on("tweet", (data) => {
  output.innerHTML +=
    "<p><strong>" + data.handle + ": </strong>" + data.message + "</p>";
});




