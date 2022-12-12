const express = require("express");
require("dotenv").config();
const sequelize = require("./db");
const models = require("./models/models");
const cors = require("cors");
const router = require("./routes/index");

PORT = process.env.PORT || 8000;

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", router);

// app.get("/", (req, res) => {
//     res.status(200).json({ message: "It works" });
// });

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
