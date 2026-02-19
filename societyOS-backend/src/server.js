const app = require("./app");
const env = require("../src/config/env");
const { connectDB } = require("../src/db/index");

const startServer = async () => {
	await connectDB();

	app.listen(env.port, () => {
		console.log(`Server is running on port ${env.port}`);
	});
};

startServer();
