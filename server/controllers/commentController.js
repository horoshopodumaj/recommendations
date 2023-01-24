const { Comment } = require("../models/models");

class CommentController {
    async create(req, res) {
        try {
            const { description, date, userId, reviewId } = req.body;
            const comment = await Comment.create({ description, date, userId, reviewId });
            return res.json(comment);
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new CommentController();
