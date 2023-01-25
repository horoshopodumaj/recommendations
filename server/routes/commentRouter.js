const Router = require("express");
const router = new Router();
const commentController = require("../controllers/commentController");

router.post("/", commentController.create);
router.get("/review/:id", commentController.getAllCommentsPost);

module.exports = router;
