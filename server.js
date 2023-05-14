import { Server } from "socket.io";

const io = new Server({
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

io.listen(4000);

console.log('Serveur MayerChat lancé !');
