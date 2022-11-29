const express = require("express");
const router = express.Router();

const mongoUtil = require("../db/mongoUtil.js");
const db = mongoUtil.getDb();
const app = express();

router.post("/", function (req, res) {
  var collection = "expense" + req.user.user;
  db.collection(collection).insertOne(req.body);
  console.log("post to", collection);
  res.status(204).send();
});

router.get("/", (req, res) => {
  var collection = "expense" + req.user.user;
  console.log("get from collection", collection);
  db.collection(collection)
    .find()
    .toArray((err, result) => {
      if (err) return console.log(err);
      res.status(200).json(result);
    });
});

router.delete("/", (req, res) => {
  var collection = "expense" + req.user.user;
  console.log("delete from", collection);
  db.collection(collection).deleteMany();
  res.status(204).send();
});
module.exports = router;
