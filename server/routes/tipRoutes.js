const myDB = require("../db/myMongoDb.js");
const express = require("express");
const router = express.Router();

// const FAKE_USER = "test"; // TODO: remove later

router.get("/", async (req, res) => {
  console.log("GET tip called by user=" + req.user);
  const user = req.user || "shane";

  if (!user) {
    res.status(401).send("User unauthorized");
    return;
  }

  const query = { user: user };
  console.log("query ", query);
  try {
    const tip = await myDB.getUserTip(query);
    res.status(200).json({ tip, msg: "Query successful" });
  } catch (e) {
    console.log("Error in db", e);
    res.status(300).json({
      propositions: [],
      msg: "Error in the query",
      error: true,
      errorObj: JSON.stringify(e)
    });
  }
});

router.post("/", async function (req, res) {
  console.log("POST Tip: ", req.body);
  const user = req.user;
  console.log("Logged in user: ", user);

  // TODO: turn back later
  // if (!user) {
  //   res.status(401).send("User unauthorized");
  //   return;
  // }

  let data = {
    user: req.body.user,
    tip: req.body.tip
  };

  const userTip = await myDB.addUserTip(data);
  res.json(userTip);
});

module.exports = router;
