const { Pool } = require("pg");
const env = require("../config/env");

const pool = new Pool({
	connectionString: env.dbUrl,
});

const connectDB = async () => {
	try {
		await pool.query("SELECT NOW()");
		console.log("PostgreSQL connected successfully");
	} catch (error) {
		console.error("Failed to connect to PostgreSQL");
		console.error(error.message);
		process.exit(1);
	}
};

const query = (text, params) => pool.query(text, params);

module.exports = { connectDB, query };
