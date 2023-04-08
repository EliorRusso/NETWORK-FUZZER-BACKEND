const net = require('net');
const fs = require('fs');
const express = require("express");
const app = express();

const server = net.createServer((socket) => {
  // 'connection' listener
  console.log('client connected');
  socket.on('end', () => {
    console.log('client disconnected');
  });
  socket.on('data', (data) => {
    console.log(`received data: ${data}`);
    fs.writeFile('/home/elior/express3/recievestatistics.json', data, (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
    });
  });
});
server.on('error', (err) => {
  throw err;
});
server.listen(8010, () => {
  console.log('server bound');
});