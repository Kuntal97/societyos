const bcrypt = require("bcrypt");
const pool = require("../../db");
const { signAccessToken, signRefreshToken } = require("../../config/jwt");

const SALT_ROUNDS = 10;

exports.register = async (req, res) => {
	try {
		const { email, password, full_name, phone } = req.body;

		if (!email || !password || !full_name) {
			return res.status(400).json({
				message: "Email, password and full name are required",
			});
		}

		const existing = await pool.query("SELECT id FROM users WHERE email = $1", [
			email,
		]);

		if (existing.rows.length > 0) {
			return res.status(409).json({
				message: "User already exists with this email",
			});
		}

		const password_hash = await bcrypt.hash(password, SALT_ROUNDS);

		const result = await pool.query(
			`INSERT INTO users (email, password_hash, full_name, phone)
            VALUES ($1, $2, $3, $4)
            RETURNING id, email, full_name, phone, created_at`,
			[email, password_hash, full_name, phone || null],
		);

		return res.status(201).json({
			message: "User registered successfully",
			user: result.rows[0],
		});
	} catch (error) {
		console.error("Register error: ", error);
		return res.status(500).json({
			message: "Internal server error",
		});
	}
};

exports.login = async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(400).json({
				message: "Email and password are required",
			});
		}

		const result = await pool.query(
			`SELECT id, email, password_hash, full_name
            FROM users
            WHERE email = $1 AND is_active = true`,
			[email],
		);

		if (result.rows.length === 0) {
			return res.status(401).json({
				message: "Invalid credentials",
			});
		}

		const user = result.rows[0];

		const validPassword = await bcrypt.compare(password, user.password_hash);

		if (!validPassword) {
			return res.status(401).json({
				message: "Invalid credentials",
			});
		}

		const accessToken = signAccessToken({
			id: user.id,
			email: user.email,
		});

		const refreshToken = signRefreshToken({
			id: user.id,
		});

		return res.json({
			message: "Login successful",
			accessToken,
			refreshToken,
			user: {
				id: user.id,
				email: user.email,
				full_name: user.full_name,
			},
		});
	} catch (error) {
		console.error("Login error: ", error);
		return res.status(500).json({
			message: "Internal server error",
		});
	}
};

exports.refresh = async (req, res) => {
	try {
		const { refreshToken } = req.body;

		if (!refreshToken) {
			return res.status(401).json({
				message: "Refresh token required",
			});
		}

		const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);

		const accessToken = signAccessToken({
			id: decoded.id,
		});

		return res.json({ accessToken });
	} catch (err) {
		return res.status(401).json({
			message: "Invalid refresh token",
		});
	}
};
