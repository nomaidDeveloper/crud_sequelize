import express from "express";
import cors from "cors";
import http from "http";
import socketIo from 'socket.io';
import morgan from 'morgan';
const db = require("./app/models");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined')); // You can customize the format as needed

// Socket.IO connection event
io.on('connection', (socket) => {
  console.log('New user connected');

  // Socket.IO event to handle incoming messages
  socket.on('sendMessage', (message) => {
    io.emit('message', message); // Broadcast the message to all connected clients
  });

  // Socket.IO event for disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Sync the database
db.sequelize.sync({})
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the bezkoder application." });
});

app.use('/', require('./app/routes'));

// Start the server
const PORT = process.env.PORT || 4001;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
