const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true, allowNull: true },
    password: { type: DataTypes.STRING, allowNull: true },
    name: { type: DataTypes.STRING, allowNull: true },
    googleId: { type: DataTypes.STRING, allowNull: true },
    role: { type: DataTypes.STRING, defaultValue: "USER" },
});

const Review = sequelize.define("review", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    workName: { type: DataTypes.STRING, allowNull: false },
    // tags: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    image: { type: DataTypes.STRING },
    rating: { type: DataTypes.INTEGER, defaultValue: 0, allowNull: false },
});

const Group = sequelize.define("group", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const Tag = sequelize.define("tag", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const Like = sequelize.define("like", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    value: { type: DataTypes.BOOLEAN, defaultValue: false },
});

const Star = sequelize.define("star", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    value: { type: DataTypes.INTEGER, defaultValue: 0 },
});

// const Rating = sequelize.define("rating", {
//     id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//     rate: { type: DataTypes.INTEGER, allowNull: false },
// });

const Comment = sequelize.define("comment", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    description: { type: DataTypes.STRING, allowNull: false },
    date: { type: DataTypes.DATEONLY, allowNull: false },
});

const TagReview = sequelize.define("tag_review", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

User.hasMany(Review);
Review.belongsTo(User);

// User.hasMany(Rating);
// Rating.belongsTo(User);

User.hasMany(Like);
Like.belongsTo(User);

User.hasMany(Comment);
Comment.belongsTo(User);

User.hasMany(Star);
Star.belongsTo(User);

Review.hasMany(Comment);
Comment.belongsTo(Review);

Review.hasMany(Star);
Star.belongsTo(Review);

Review.hasMany(Like);
Like.belongsTo(Review);

// Review.hasOne(Rating);
// Rating.belongsTo(Review);

Group.hasMany(Review);
Review.belongsTo(Group);

Tag.belongsToMany(Review, { through: TagReview });
Review.belongsToMany(Tag, { through: TagReview });

// sequelize
//     .sync({ alter: true })
//     .then(() => {
//         console.log("Tables have been created");
//     })
//     .catch((err) => console.log(err));

module.exports = {
    User,
    Review,
    Group,
    Tag,
    Comment,
    Star,
    Like,
    TagReview,
};
