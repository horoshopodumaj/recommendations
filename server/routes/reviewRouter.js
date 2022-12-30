const Router = require("express");
const router = new Router();
const reviewController = require("../controllers/reviewController");

router.post("/", reviewController.create);
router.get("/", reviewController.getAll);
router.get("/:id", reviewController.getOne);
router.get("/user/:id", reviewController.getUserReviews);
router.get("/category/:id", reviewController.getCategoryReviews);

module.exports = router;
