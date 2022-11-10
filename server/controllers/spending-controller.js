import myDB from "../db/myMongoDb.js";

exports.getUser = async (req, res) => {
  // TODO: Check w/ passport.js structure
  const user = req.session.user;

  console.log("getUser called with user=" + user);

  if (!user) {
    res.status(401).send("User unauthorized");
    return;
  }

  const spendings = await myDB.getSpending(user);
  res.json(spendings);
};
