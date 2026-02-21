const pool = require("../../db");

exports.createSociety = async (req, res) => {
	try {
		const { name, address, city, state, country } = req.body;

		if (!name) {
			return res.status(400).status({
				message: "Society name is required",
			});
		}

		const userId = req.user.id;

		const societyResult = await pool.query(
			`INSERT INTO societies (name, address, city, state, country, created_by)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *`,
			[
				name,
				address || null,
				city || null,
				state || null,
				country || "India",
				userId,
			],
		);

		const society = societyResult.rows[0];

		await pool.query(
			`INSERT INTO user_societies (user_id, society_id, role)
			 VALUES ($1, $2, 'society_admin')`,
			[userId, society.id],
		);

		return res.status(201).json({
			message: "Society created successfully",
			society,
		});
	} catch (error) {
		console.error("Create society error: ", error);
		return res.status(500).json({
			message: "Internal server error",
		});
	}
};
