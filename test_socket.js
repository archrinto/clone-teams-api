import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
    console.log('Client connected');
  
    // Tambahkan kode untuk penanganan pesan dan peristiwa Socket.io di sini
  
    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});