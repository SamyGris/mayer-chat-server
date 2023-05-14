import { createServer } from 'http';
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  }
});

var sockets = [];

io.on('connection', (socket) => {
  sockets = [...sockets, socket];
  console.log('Un utilisateur s\'est connecté');

  socket.on('message', async (msg) => {
    console.log(`${msg.from} : ${msg.content}`);

    sockets.forEach(s => {
      s.emit('message', msg);
    });
  });

  socket.on('disconnect', () => {
    console.log('Un utilisateur s\'est déconnecté.');
  });
});

httpServer.listen(4000);

console.log('Serveur MayerChat lancé !');
