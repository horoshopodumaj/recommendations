const uuid = require("uuid");
const cloudinary = require("../utils/cloudinary");
const { Review, Tag, TagReview, User, Group, Like, Star, Comment } = require("../models/models");
const ApiError = require("../error/ApiError");
const { Op } = require("sequelize");

class ReviewController {
    async create(req, res, next) {
        try {
            let { title, workName, description, groupId, rating, userId, tag, image } = req.body;
            let uploadResponse;
            if (!!image) {
                uploadResponse = await cloudinary.uploader.upload(image, {
                    folder: "recommend",
                });
            } else {
                console.log(54);
                uploadResponse = {
                    secure_url: null,
                };
            }
            tag = JSON.parse(tag);
            const newTags = tag.filter((item) => item.inputValue);
            const tagsId = tag.filter((item) => item.id);
            newTags.forEach(async (item) => {
                const name = item.name;
                const newTagId = await Tag.create({ name });
                tagsId.push(newTagId.dataValues);
            });
            const review = await Review.create({
                title,
                workName,
                description,
                groupId,
                rating,
                userId,
                image: uploadResponse.secure_url,
            });
            tagsId.forEach(async (item) => {
                const id = item.id;
                const newRelation = await TagReview.create({ tagId: id, reviewId: review.id });
            });
            return res.json({ message: "success" });
        } catch (error) {
            console.log(error);
        }
    }

    async getAll(req, res) {
        let { groupId, limit, page } = req.query;
        page = page || 1;
        limit = limit || 9;
        let offset = page * limit - limit;
        let reviews;
        if (groupId) {
            reviews = await Review.findAndCountAll({ where: { groupId }, limit, offset });
        } else {
            reviews = await Review.findAndCountAll({ limit, offset });
        }
        return res.json(reviews);
    }

    async getOne(req, res) {
        const { id } = req.params;
        const review = await Review.findOne({
            where: { id },
            include: [
                {
                    model: User,
                    attributes: ["id", "name", "role"],
                },
                {
                    model: Group,
                    attributes: ["id", "name"],
                },
                {
                    model: Like,
                    where: { value: true },
                    attributes: ["id", "value", "userId"],
                    required: false,
                },
                {
                    model: Star,
                    attributes: ["id", "value", "userId"],
                    required: false,
                },
                {
                    model: Tag,
                    required: false,
                },
                {
                    model: Comment,
                    required: false,
                },
            ],
        });
        return res.json(review);
    }
    // async getUserReviews(req, res) {
    //     const { id } = req.params;
    //     const reviews = await Review.findAll({
    //         where: { userId: id },
    //         include: [
    //             {
    //                 model: User,
    //                 attributes: ["id", "name", "role"],
    //             },
    //             {
    //                 model: Group,
    //                 attributes: ["id", "name"],
    //             },
    //         ],
    //     });
    //     return res.json(reviews);
    // }
    async getCategoryReviews(req, res) {
        let { limit, page } = req.query;
        page = page || 1;
        limit = limit || 3;
        let offset = page * limit - limit;
        try {
            const { id } = req.params;
            const reviews = await Review.findAndCountAll({
                where: { groupId: id },
                order: [["createdAt", "DESC"]],
                limit,
                offset,
                distinct: "Review.id",
                include: [
                    {
                        model: User,
                        attributes: ["id", "name", "role"],
                    },
                    {
                        model: Group,
                        attributes: ["id", "name"],
                    },
                    {
                        model: Like,
                        where: { value: true },
                        attributes: ["id", "value", "userId"],
                        required: false,
                    },
                    {
                        model: Star,
                        attributes: ["id", "value", "userId"],
                        required: false,
                    },
                    {
                        model: Tag,
                        required: false,
                    },
                    {
                        model: Comment,
                        required: false,
                    },
                ],
            });
            return res.json(reviews);
        } catch (error) {
            console.log(error);
        }
    }

    async getLatestReviews(req, res) {
        try {
            let { limit, order, page } = req.query;
            page = page || 1;
            limit = limit || null;
            let offset = page * limit - limit;
            let queryParams = {
                where: {},
                order: [[order, "DESC"]],
                limit: limit,
                offset,
                distinct: "Review.id",
                include: [
                    {
                        model: User,
                        attributes: ["id", "name", "role"],
                    },
                    {
                        model: Star,
                        attributes: ["id", "value", "userId"],
                        required: false,
                    },
                    {
                        model: Group,
                        attributes: ["id", "name"],
                    },
                    {
                        model: Like,
                        where: { value: true },
                        attributes: ["id", "value", "userId"],
                        required: false,
                    },
                    {
                        model: Tag,
                        required: false,
                    },
                    {
                        model: Comment,
                        required: false,
                    },
                ],
            };

            const reviews = await Review.findAndCountAll(queryParams);
            return res.json(reviews);
        } catch (error) {
            console.log(error);
        }
    }

    async getTotalLikes(req, res) {
        const { id } = req.params;
        const { count } = await Like.findAndCountAll({
            where: { reviewId: id, value: true },
        });
        return res.json(count);
    }
    async getTotalRating(req, res) {
        const { id } = req.params;
        const { rows } = await Star.findAndCountAll({
            where: { reviewId: id },
            attributes: ["value"],
        });
        return res.json(rows);
    }

    async update(req, res, next) {
        const { id } = req.params;
        try {
            let { title, workName, description, groupId, rating, tag, image } = req.body;
            let uploadResponse;
            if (!!image) {
                uploadResponse = await cloudinary.uploader.upload(image, {
                    folder: "recommend",
                });
            } else {
                console.log(54);
                uploadResponse = {
                    secure_url: null,
                };
            }
            tag = JSON.parse(tag);
            const newTags = tag.filter((item) => item.inputValue);
            const tagsId = tag.filter((item) => item.id);
            newTags.forEach(async (item) => {
                const name = item.name;
                const newTagId = await Tag.create({ name });
                tagsId.push(newTagId.dataValues);
            });
            const review = await Review.update(
                {
                    title,
                    workName,
                    description,
                    groupId,
                    rating,
                    image: uploadResponse.secure_url,
                },
                { where: { id } }
            );
            tagsId.forEach(async (item) => {
                const idTag = item.id;
                const newRelation = await TagReview.create({ tagId: idTag, reviewId: id });
            });
            return res.json({ message: "success" });
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new ReviewController();
