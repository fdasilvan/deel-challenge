const express = require("express");
const bodyParser = require("body-parser");
const { sequelize } = require("./model");

const app = express();
app.use(bodyParser.json());

app.set("sequelize", sequelize);
app.set("models", sequelize.models);

// Applies the authentication middleware for all the next routes
app.use(require("./routes/middleware/getProfile"));

app.use("/contracts", require("./routes/contracts"));
app.use("/jobs", require("./routes/jobs"));

module.exports = app;
