const router = require("express").Router();
const spending = require("../controllers/spending-controller.js");

// Create
router.post("/", spending.addRecord);

// Retrieve by userId
router.get("/user", spending.getUser);

// Delete
// router.delete("/:id", ); // TODO

module.exports = router;
