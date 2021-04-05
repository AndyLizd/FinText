const setUpTweet = (io, stock_id) => {
  io.on("connection", (socket) => {
    const channel = "tweet:" + stock_id;
    // console.log("make socket connection in:", channel);

    // socket: the client that sends data
    socket.on(channel, (data) => {
      // io.sockets: all sockets
      io.sockets.emit(channel, data);
    });
  });
};

module.exports = setUpTweet;
