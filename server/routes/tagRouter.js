const Router = require("express");
const router = new Router();
const tagController = require("../controllers/tagController");

router.post("/", tagController.create);
router.get("/", tagController.getAll);
router.get("/:id", tagController.getOne);

module.exports = router;
