const express = require("express");
const router = express.Router();

const mongoUtil = require("../db/mongoUtil.js");
const db = mongoUtil.getDb();

router.get("/", (req, res) => {
  if (!req.user) {
    res.status(401).send();
    return;
  }

  let collection = "rankstatus" + req.user.user;
  console.log("rank status collection is", collection);
  db.collection(collection)
    .find()
    .toArray((err, result) => {
      if (err) return console.log(err);
      res.status(200).json(result);
    });
});

router.post("/", (req, res) => {
  let collection = "rankstatus" + req.user.user;

  // db.collection(collection).deleteMany();
  let data = req.body;
  //db.collection(collection).insertOne(req.body);
  db.collection(collection).bulkWrite(
    [{ deleteMany: { filter: {} } }, { insertOne: { data } }],
    { ordered: true }
  );
  res.status(204).send();
});

module.exports = router;
