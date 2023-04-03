const express = require("express");
const { chats } = require("./data/data.js");
const connectDB = require("./config/db.js");
const userRoutes = require("./routes/userRoutes");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

app.use(express.json());
connectDB();

app.get("/chats", (req, res) => {
  res.send(chats);
});

app.use("/api/user", userRoutes);
// app.use("/api/chat", chatRoutes);
// app.use("/api/message", messageRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(5000, () => {
  console.log("Server is running");
});
