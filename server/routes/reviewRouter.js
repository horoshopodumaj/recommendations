const Router = require("express");
const router = new Router();
const reviewController = require("../controllers/reviewController");

router.post("/", reviewController.create);
router.get("/", reviewController.getAll);
router.get("/:id", reviewController.getOne);

module.exports = router;
