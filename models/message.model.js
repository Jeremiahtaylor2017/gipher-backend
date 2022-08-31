const mongoose = require("mongoose");

// model
const Schema = mongoose.Schema;

const MessageScema = new Schema({
	users: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		}
	],
	username: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	},
	message: {
		type: String
	}
});

module.exports = mongoose.model("Message", MessageScema);
