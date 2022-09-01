const User = require("../models/user.model");
const router = require("express").Router();

//index
router.get("/", async (req, res) => {
	try {
		res.status(200).json(await User.find({ email: req.user.email }));
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
	const { displayName, email } = req.body;

	for (let key in req.body) {
		if (req.body[key] === "") {
			delete req.body[key];
		}
	}

	try {
		const user = await User.find({ email: email });
		console.log(user);
		if (user.length > 0) {
			res.status(200).json(user);
		} else {
			res.status(201).json(
				await User.create({
					name: displayName,
					username: `@${displayName.split(" ").join("").toLowerCase()}`,
					email
				})
			);
		}
	} catch (error) {
		console.log(error);
		res
			.status(400)
			.json({ message: "Email already in use. Please choose another." });
	}
});

module.exports = router;
