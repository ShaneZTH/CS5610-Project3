const myDB = require("../db/myMongoDb.js");

const FAKE_USER = "test"; // TODO: remove later

exports.getAll = async (req, res) => {
  const user = req.user ? req.user : FAKE_USER;
  console.log("searchRecord called with user=" + user);

  if (!user) {
    res.status(401).send("User unauthorized");
    return;
  }
};
