const uuid = require("uuid");
const path = require("path");
const { Review } = require("../models/models");
const ApiError = require("../error/ApiError");

class ReviewController {
    async create(req, res, next) {
        try {
            const { title, workName, description, groupId, rating } = req.body;
            const { image } = req.files;
            let fileName = uuid.v4() + ".jpg";
            image.mv(path.resolve(__dirname, "..", "static", fileName));

            const review = await Review.create({
                title,
                workName,
                description,
                groupId,
                rating,
                image: fileName,
            });
            return res.json(review);
        } catch (error) {
            next(ApiError.badRequest(error.message));
        }
    }

    async getAll(req, res) {
        res.json("jii");
    }

    async getOne(req, res) {}
}

module.exports = new ReviewController();
