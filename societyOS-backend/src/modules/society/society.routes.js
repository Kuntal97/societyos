const express = require("express");
const router = express.Router();
const societyController = require("./society.controller");

const auth = require("../../middleware/auth.middleware");
const tenant = require("../../middleware/tenant.middleware");

// Only logged-in users can create societies
router.post("/", auth, societyController.createSociety);

router.get("/me", auth, tenant, (req, res) => {
	res.json({
		message: "Tenant middleware working",
		societyId: req.societyId,
		role: req.userRole,
	});
});

module.exports = router;
