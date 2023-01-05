const Router = require("express");
const likeContoller = require("../controllers/likeContoller");
const router = new Router();

router.post("/", likeContoller.create);
router.get("/");

module.exports = router;
