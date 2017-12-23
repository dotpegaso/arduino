'use strict';

const five = require('johnny-five');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

let led = null;

app.use(express.static(__dirname + '/public'))
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html')
});

five.Board().on('ready', function() {
  console.log('Aight! Arduino conectado! :D');

  //code goes here
  
});

const port = process.env.PORT || 3000;

server.listen(port);
console.log(`Tudo certo, o site está rodando em: http://localhost:${port}`);