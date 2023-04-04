const express = require("express");
const { chats } = require("./data/data.js");
const connectDB = require("./config/db.js");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
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
// app.use("/api/message", messageRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(5000, () => {
  console.log("Server is running");
});
