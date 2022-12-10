const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    emailQ: { type: DataTypes.STRING, unique: true },
    passwordQ: { type: DataTypes.STRING },
    nameQ: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: "USER" },
});

const Review = sequelize.define("review", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    workName: { type: DataTypes.STRING, allowNull: false },
    tags: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    image: { type: DataTypes.STRING },
    rating: { type: DataTypes.INTEGER, defaultValue: 0 },
});
