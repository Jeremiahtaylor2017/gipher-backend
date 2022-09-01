// dependencies
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const logger = require("morgan");
const admin = require("firebase-admin");
const { getAuth } = require("firebase-admin/auth");
require("dotenv").config();

const userRouter = require("./controllers/user.controller");

// setup
const app = express();
const { PORT, MONGO_URI, PRIVATE_KEY_ID, PRIVATE_KEY } = process.env;

// firebase service account
admin.initializeApp({
	credential: admin.credential.cert({
		"type": "service_account",
		"project_id": "gipher-30449",
		"private_key_id": PRIVATE_KEY_ID,
		"private_key": PRIVATE_KEY.replace(/\\n/g, "\n"),
		"client_email":
			"firebase-adminsdk-gg5u2@gipher-30449.iam.gserviceaccount.com",
		"client_id": "111900155827582049087",
		"auth_uri": "https://accounts.google.com/o/oauth2/auth",
		"token_uri": "https://oauth2.googleapis.com/token",
		"auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
		"client_x509_cert_url":
			"https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-gg5u2%40gipher-30449.iam.gserviceaccount.com"
	})
});

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

// authorization middleware
app.use(async function (req, res, next) {
	try {
		const token = req.get("Authorization");
		if (token) {
			const user = await getAuth().verifyIdToken(token.replace("Bearer ", ""));
			req.user = user;
		} else {
			req.user = null;
		}
	} catch (error) {
		req.user = null;
	}
	next();
});

function isAuthenticated(req, res, next) {
	if (req.user) return next();
	res.status(401).json({ message: "You must login first" });
}

// routes
app.get("/", (req, res) => {
	res.send("Gipher API");
});

app.use("/api/user", isAuthenticated, userRouter);

// listener
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
