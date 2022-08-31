const User = require("../models/user.model");
const router = require("express").Router();

//index
router.get("/", async (req, res) => {
	try {
		res.status(200).json(await User.find({}));
	} catch (error) {
		res.status(400).json({ message: "Bad request" });
	}
});

// delete
router.delete("/:id", async (req, res) => {
	try {
		res.status(200).json(await User.findByIdAndDelete(req.params.id));
	} catch (error) {
		res.status(400).json({ message: "Bad request" });
	}
});

// update
router.put("/:id", async (req, res) => {
	try {
		res
			.status(200)
			.json(
				await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
			);
	} catch (error) {
		console.log(error);
		res.status(400).json({ message: "Bad request " });
	}
});

// create
router.post("/", async (req, res) => {
	for (let key in req.body) {
		if (req.body[key] === "") {
			delete req.body[key];
		}
	}

	try {
		res.status(201).json(await User.create(req.body));
	} catch (error) {
		res.status(400).json({ message: "Bad request" });
	}
});

module.exports = router;
