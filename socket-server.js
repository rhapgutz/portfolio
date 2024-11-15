import express from 'express';
const app = express();
import { Server } from 'socket.io';

const expressServer = app.listen(8988);
const io = new Server(expressServer, {
  cors: {
    origin: "http://localhost:4200",
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log(socket.id, "has connected");

  socket.join('poker-planning');

  socket.on('sendUserStoryStateToServer', (state) => {
    io.except(socket.id).to('poker-planning').emit('sendUserStoryStateToClients', state);
  });

  socket.on('sendMessageToServer', (userMessage) => {
    io.except(socket.id).to('poker-planning').emit('sendMessageToClients', userMessage);
  });
});