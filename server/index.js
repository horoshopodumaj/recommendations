const express = require("express");
require("dotenv").config();
const sequelize = require("./db");
const models = require("./models/models");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const router = require("./routes/index");
const errorHandler = require("./middleware/ErrorMiddleware");
const path = require("path");
const passport = require("passport");
const session = require("express-session");
const MemoryStore = require("memorystore")(session);
const cookieParser = require("cookie-parser");

require("./auth/passportGoogle");
require("./auth/passportFacebook");
require("./auth/passportGithub");
require("./auth/passportTwitter");

PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.static(path.resolve(__dirname, "static")));
app.use(fileUpload({}));
app.use(cookieParser());

app.set("trust proxy", 1);

app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
        //optionsSuccessStatus: 200,
        //allowedHeaders: ["Origin", "Content-Type", "Accept"],
    })
);
app.use(
    session({
        secret: process.env.SECRET_KEY,
        cookie: {
            // secure: true,
            maxAge: 86400000,
            //sameSite: "none",
        },
        resave: false,
        saveUninitialized: false,
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api", router);

//app.use(errorHandler);

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
