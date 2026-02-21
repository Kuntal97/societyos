const pool = require("../db");

module.exports = async (req, res, next) => {
	try {
		const societyId = req.headers["x-society-id"];
		const userId = req.user?.id;

		if (!societyId) {
			return res.status(400).json({
				message: "Society ID header missing",
			});
		}

		// Check membership
		const result = await pool.query(
			`SELECT * FROM user_societies
             WHERE user_id = $1 AND society_id = $2`,
			[userId, societyId],
		);

		if (result.rows.length === 0) {
			return res.status(403).json({
				message: "Access denied for this society",
			});
		}

		// attach tenant info
		req.societyId = societyId;
		req.userRole = result.rows[0].role;

		next();
	} catch (err) {
		console.error("Tenant middleware error:", err);
		return res.status(500).json({
			message: "Tenant validation failed",
		});
	}
};
