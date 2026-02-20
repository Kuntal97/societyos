import { useState } from "react";
import axios from "axios";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = async (e) => {
		e.preventDefault();

		try {
			const res = await axios.post("http://localhost:5000/api/auth/login", {
				email,
				password,
			});

			localStorage.setItem("accessToken", res.data.accessToken);
			localStorage.setItem("refreshToken", res.data.refreshToken);

			alert("Login successful");
		} catch (err) {
			alert("Login failed");
		}
	};

	return (
		<div style={{ padding: "40px" }}>
			<h2>SocietyOS Login</h2>

			<form onSubmit={handleLogin}>
				<input
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<br />
				<br />
				<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<br />
				<br />
				<button type="submit">Login</button>
			</form>
		</div>
	);
}
