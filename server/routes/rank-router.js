const router = require("express").Router();
const rank = require("../controllers/rank-controller");

router.get("/", rank.getAll);
