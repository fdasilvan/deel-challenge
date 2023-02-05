const express = require("express");
const bodyParser = require("body-parser");
const { sequelize } = require("./model");

const app = express();
app.use(bodyParser.json());

app.set("sequelize", sequelize);
app.set("models", sequelize.models);

const getProfile = require("./routes/middleware/getProfile");

const contracts = require("./routes/contracts");

app.use(getProfile);
app.use("/contracts", contracts);

module.exports = app;
