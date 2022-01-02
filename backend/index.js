const express = require('express');
const cors = require('cors');
const db = require('./config/mongoose');
require('dotenv').config();
const PORT = process.env.PORT;
const socketio = require('socket.io');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//chat server

const chatServer = require('http').Server(app);
const io = socketio(chatServer);

const chatSocket = require('./config/chactSocket').chatSockets(io);

chatServer.listen(8000, () => {
  console.log('chat server is started');
});

//chat server

app.use('/api', require('./router'));
app.use('/uploads',express.static('uploads'));

app.listen(PORT, () => {
  console.log('success');
});