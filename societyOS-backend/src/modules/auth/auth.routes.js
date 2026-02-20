const express = require("express");
const router = express.Router();
const authController = require("./auth.controller");
const auth = require("../../middleware/auth.middleware");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/refresh", authController.refresh);

router.get("/me", auth, (req, res) => {
	res.json({
		message: "You accessed protected route",
		user: req.user,
	});
});

module.exports = router;
