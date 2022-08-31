const Post = require("../models/post.model");
const router = require("express").Router();

// index
router.get("/", async (req, res) => {
	try {
		res.status(200).json(await Post.find({}));
	} catch (error) {
		res.status(400).json({ message: "Bad request " });
	}
});

// delete
router.delete("/:id", async (req, res) => {
	try {
		res.status(200).json(await Post.findByIdAndDelete(req.params.id));
	} catch (error) {
		res.status(400).json({ message: "Bad request " });
	}
});

// create
router.post("/:id", async (req, res) => {
	try {
		res.status(200).json(await Post.create(req.body));
	} catch (error) {
		res.status(400).json({ message: "Bad request " });
	}
});

module.exports = router;
