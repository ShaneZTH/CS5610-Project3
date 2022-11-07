const express = require("express");

const A = require("../controllers/controller-A");

const router = express.Router();

router.post("/a", A.create);
router.delete("/a/:id", A.deleteById);
router.get("/a/:id", A.getById);
router.get("/a", A.get);

module.exports = router;
