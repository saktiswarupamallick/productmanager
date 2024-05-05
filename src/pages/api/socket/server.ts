import http from 'http';
import { Server as SocketIOServer, ServerOptions } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';

export interface Message {
    content: string;
    sender?: string; // Optional for future development
  }

const server = http.createServer((req, res) => {
  // Handle HTTP requests if needed
});

const io = new SocketIOServer(server, {
  cors: {
    origin: '*', // Allow connections from any origin (adjust for production)
  },
});

const connectedUsers: Record<string, string[]> = {};

io.on('connection', (socket) => {
  console.log('A user connected');

  const roomId = socket.handshake.query.roomId as string;

  if (!roomId) {
    // Generate a new room ID if not provided
    const newRoomId = uuidv4();
    socket.join(newRoomId);
    connectedUsers[newRoomId] = [];
    console.log(`Created new room: ${newRoomId}`);
    socket.emit('roomCreated', newRoomId);
  } else {
    // Join existing room
    socket.join(roomId);
    connectedUsers[roomId]?.push(socket.id);
    console.log(`User ${socket.id} joined room: ${roomId}`);
    io.to(roomId).emit('userJoined', socket.id);
  }

  // Handle chat messages
  socket.on('chat message', (message: Message) => {
    io.to(roomId).emit('chat message', message);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
    const userIndex = connectedUsers[roomId]?.indexOf(socket.id);
    if (userIndex !== undefined) {
      connectedUsers[roomId].splice(userIndex, 1);
      io.to(roomId).emit('userLeft', socket.id);
      if (connectedUsers[roomId].length === 0) {
        // Remove empty room
        delete connectedUsers[roomId];
        console.log(`Room ${roomId} closed`);
      }
    }
  });
});

server.listen(3001, () => {
  console.log('WebSocket server listening on port 3000');
});