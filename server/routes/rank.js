const express = require("express");
const router = express.Router();

const mongoUtil = require("../db/mongoUtil.js");
const db = mongoUtil.getDb();

router.post("/", function (req, res) {
  var collection = "ranktest";
  var query = { username: req.body.username };
  if (req.body.overall !== null) {
    db.collection(collection).findOneAndReplace(
      query,
      req.body,
      { upsert: true },
      function (err, doc) {
        if (err) return res.send(500, { error: err });
        return res.status(204).send();
      }
    );
  }
});

router.get("/", function (req, res) {
  var collection = "ranktest";
  db.collection(collection)
    .find()
    .toArray((err, result) => {
      if (err) return console.log(err);
      res.status(200).json(result);
    });
});

module.exports = router;
