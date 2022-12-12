const express = require("express");
require("dotenv").config();
const sequelize = require("./db");
const models = require("./models/models");
PORT = process.env.PORT || 8000;

const app = express();

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => {
            console.log(`Server started on ${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
};

start();
