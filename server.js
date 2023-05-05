import { Server } from "socket.io";
import pkg from 'pg';
const { Pool } = pkg;

const io = new Server({
  cors: {
    origin: "*"
  }
});

const pool = new Pool({
  user: "postgres",
  password: "postgres",
  host: "localhost",
  database: "mayer-chat"
});

var sockets = [];

io.on('connection', (socket) => {
  sockets = [...sockets, socket];
  console.log('Un utilisateur s\'est connecté');

  socket.on('message', async (msg) => {
    console.log(`${msg.from} : ${msg.content}`);

    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      await client.query('INSERT INTO messages (id, from, content) VALUES ($1, $2, $3)', [msg.id, msg.from, msg.content]);
      await client.query('COMMIT');
    } catch (e) {
      await client.query('ROLLBACK');
      throw e;
    } finally {
      client.release();
    }

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
