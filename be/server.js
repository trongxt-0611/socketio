const express = require("express");
const { chats } = require("./data/data.js");
const connectDB = require("./config/db.js");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const app = express();
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
dotenv.config();
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

app.use(express.json());
connectDB();

app.get("/chats", (req, res) => {
  res.send(chats);
});

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);


// ----------------deployment--------------------




// ----------------deployment---------------------



app.use(notFound);
app.use(errorHandler);

const server = app.listen(5000, () => {
  console.log("Server is running");
});

const io = require("socket.io")(server, {
  pingTimeout: 30000,
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("connected to socketio");

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    console.log(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("joined room: " + room);
  });

  socket.on("new message", (newMess) => {
    let chat = newMess.chat;

    if (!chat.users) {
      console.log("chat.users not defined");
      return;
    }
    chat.users.forEach((user) => {
      if (user._id === newMess.sender._id) return;
      socket.in(user._id).emit("message recieved", newMess);
    });
  });

  socket.off("setup", () => {
    socket.leave(userData._id);
  });
});
