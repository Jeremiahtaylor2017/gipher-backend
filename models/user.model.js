const mongoose = require("mongoose");

// model
const Schema = mongoose.Schema;

const UserSchema = new Schema(
	{
		name: {
			type: String,
			required: true
		},
		username: {
			type: String,
			required: true
		},
		email: {
			type: String,
			required: true,
			unique: true
		},
		image: {
			type: String,
			default:
				"https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
		},
		following: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User"
			}
		],
		followers: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User"
			}
		],
		posts: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Post"
			}
		],
		notifications: {
			type: Array
		},
		messages: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Message"
			}
		],
		saved: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Post"
			}
		]
	},
	{ timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
