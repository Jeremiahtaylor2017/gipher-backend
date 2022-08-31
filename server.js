// dependencies
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const logger = require("morgan");
require("dotenv").config();

const userRouter = require("./controllers/user.controller");

// setup
const app = express();
const { PORT, MONGO_URI } = process.env;

// db connections
mongoose.connect(MONGO_URI);
mongoose.connection
	.on("open", () => console.log("Connected to MongoDB"))
	.on("close", () => console.log("Disconnected from MongoDB"))
	.on("error", () => console.log(err.message));

// mount middleware
app.use(cors());
app.use(logger("dev"));
app.use(express.json());

// routes
app.get("/", (req, res) => {
	res.send("Gipher API");
});

app.use("/api/user", userRouter);

// listener
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
