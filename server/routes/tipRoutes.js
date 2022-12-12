const myDB = require("../db/myMongoDb.js");
const express = require("express");
const router = express.Router();

const mongoUtil = require("../db/mongoUtil.js");
const db = mongoUtil.getDb();

const coll = "tip";

router.get("/", async (req, res) => {
  if (!req.user || !req.user.user) {
    console.error("Get tip called by unauthorized user. Rejected.");
    res.status(401).send();
    return;
  }

  const user = req.user.user;
  console.log("GET tip called by user=" + user);

  const query = { user: user };
  try {
    db.collection(coll)
      .find(query)
      .toArray((err, result) => {
        if (err) return console.log(err);

        console.log("Tip get result: ", result);

        res.status(200).json(result);
      });
  } catch (e) {
    // console.log("Error in db", e);
    res.status(300).json({
      propositions: [],
      msg: "Error in the query",
      error: true,
      errorObj: JSON.stringify(e),
    });
  }
});

router.post("/", async function (req, res) {
  console.log("POST Tip: ", req.body);
  const user = req.user.user;

  let data = {
    user: user,
    tip: req.body.tip,
  };

  db.collection(coll).insertOne(data);
  res.status(204).send();
});

module.exports = router;
