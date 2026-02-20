const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const errorHandler = require("./middleware/errorHandler");
const notFound = require("./middleware/notFound");

const authRoutes = require("../src/modules/auth/auth.routes");

const app = express();

app.use(helmet());

app.use(cors());

app.use(express.json());

app.use(morgan("dev"));

app.use("/api/auth", authRoutes);

app.get("/api/health", (req, res) => {
	res.json({ success: true, status: "ok" });
});

// Not found handler (must be after routes)
app.use(notFound);

// Global error handler (must be last)
app.use(errorHandler);

module.exports = app;
