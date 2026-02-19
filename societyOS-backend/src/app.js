const express = require("express");
const app = express();

app.get("/", (req, res) => {
	res.send("SocietyOS API running");
});

module.exports = app;
