const express = require("express");
const router = express.Router();

const mongoUtil = require("../db/mongoUtil.js");
const db = mongoUtil.getDb();

router.get("/", (req, res) => {
  var collection = "budget" + req.user.user;
  console.log("get from budget collection", collection);
  db.collection(collection)
    .find()
    .toArray((err, result) => {
      if (err) return console.log(err);
      res.status(200).json(result);
    });
});

router.post("/", (req, res) => {
  var collection = "budget" + req.user.user;
  var query = { category: req.body.category };
  db.collection(collection).findOneAndReplace(
    query,
    req.body,
    { upsert: true },
    function (err, doc) {
      if (err) return res.send(500, { error: err });
      return res.status(204).send();
    }
  );
});

module.exports = router;
