const Router = require("express");
const router = new Router();
const groupController = require("../controllers/groupController");

router.post("/", groupController.create);
router.get("/", groupController.getAll);
router.get("/:id", groupController.getOne);

module.exports = router;
