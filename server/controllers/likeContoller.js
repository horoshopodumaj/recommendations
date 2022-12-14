const { Like } = require("../models/models");

class LikeController {
    async create(req, res) {
        try {
            const { value, userId, reviewId } = req.body;
            const like = await Like.findOne({
                where: { userId: userId, reviewId: reviewId },
            });
            if (!like) {
                const like = await Like.create({ value, userId, reviewId });
            } else {
                const like = await Like.update(
                    { value: value },
                    { where: { userId: userId, reviewId: reviewId } }
                );
            }

            const updatedOrNewLike = await Like.findOne({
                where: { userId: userId, reviewId: reviewId },
            });
            return res.json(updatedOrNewLike);
        } catch (error) {
            console.log(error);
        }
    }
    async getAll(req, res) {}
}

module.exports = new LikeController();
