const mongoose = require("mongoose");

// model
const Schema = mongoose.Schema;

const PostSchema = new Schema({
	name: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true
	},
	username: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true
	},
	text: {
		type: String
	},
	gif: {
		type: String
	},
	likes: {
		type: Number,
		default: 0
	},
	comments: [
		{
			type: String
		}
	]
});

module.exports = mongoose.model("Post", PostSchema);
