const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/client.html');
});

users = [];
io.on('connection', function(socket) {
    console.log('A user connected');
    socket.on('setUsername', function(data) {
       console.log(data);
       if(users.indexOf(data) > -1) {
          socket.emit('userExists', data + ' username is taken! Try some other username.');
       } else {
          users.push(data);
          socket.emit('userSet', {username: data});
       }
    });
    
    socket.on('msg', function(data) {
       //Send message to everyone
       io.sockets.emit('newmsg', data);
    })
 });

server.listen(3000, () => {
    console.log('listening on *:3000');
  });
  