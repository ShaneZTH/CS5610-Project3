const myDB = require("../db/myMongoDb.js");

const FAKE_USER = "test"; // TODO: remove later

exports.addRecord = async (req, res) => {
  // TODO: Check w/ passport.js structure
  const user = req.user ? req.user : FAKE_USER;
  console.log("addRecord called with user=" + user);

  if (!user) {
    res.status(401).send("User unauthorized");
    return;
  }

  let data = {
    user: user,
    category: req.body.category,
    item: req.body.item,
    cost: req.body.cost
  };

  const spendings = await myDB.createSpendingRecord(data);
  res.json(spendings);
};

exports.search = async (req, res) => {
  const user = req.user ? req.user : FAKE_USER;
  console.log("searchRecord called with user=" + user);

  if (!user) {
    res.status(401).send("User unauthorized");
    return;
  }

  const key = req.query.searchKey;
  const val = req.query.searchValue;

  let query = {
    user: user,
    key: val
  };

  const spendings = await myDB.searchSpendingRecord(query);
  res.json(spendings);
};

exports.getUser = async (req, res) => {
  // TODO: Check w/ passport.js structure
  const user = req.user ? req.user : FAKE_USER;
  console.log("getUser called with user=" + user);

  if (!user) {
    res.status(401).send("User unauthorized");
    return;
  }

  const query = { user: user };
  try {
    const spendings = await myDB.searchSpendingRecord(query);
    res.status(200).json({ spendings, msg: "Query successful" });
  } catch (e) {
    console.log("Error in db", e);
    res.status(300).json({
      propositions: [],
      msg: "Error in the query",
      error: true,
      errorObj: JSON.stringify(e)
    });
  }
  // res.json(spendings);
};
