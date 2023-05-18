const http = require('http');
const WebSocket = require('ws');

const server = http.createServer();
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('Un utilisateur s\'est connecté');

  ws.on('message', (msg) => {
    console.log(`Message reçu: ${msg}`);

    // Envoie le message à tous les clients connectés
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        console.log("Message sent.");
        client.send(msg);
      }
    });
  });

  ws.on('close', () => {
    console.log('Un utilisateur s\'est déconnecté.');
  });
});

server.listen(3000, () => {
  console.log('Serveur MayerChat lancé !');
});
