const { query } = require("../../db");

const findUserByEmail = async (email) => {
	const result = await query("SELECT * FROM user WHERE email = $1 LIMIT 1", [
		email,
	]);
	return result.rows[0];
};

const createUser = async ({ email, passwordHash, fullName, phone }) => {
	const result = await query(
		`INSERT INTO users (email, password_hash, full_name, phone)
        VALUES ($1, $2, $3, $4)
        RETURNING id, email, full_name`,
		[email, passwordHash, fullName, phone],
	);
	return result.rows[0];
};

module.exports = {
	findUserByEmail,
	createUser,
};
