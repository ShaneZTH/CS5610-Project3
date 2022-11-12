const router = require("express").Router();
const mongoUtil = require("../db/mongoUtil.js");
const db = mongoUtil.getDb();

// Simple Login
router.post("/login", (req, res) => {
  const username = req.body.myname;
  const password = req.body.mypassword;
  console.log(username + ":" + password);

  // Authenticate the User
  const query = { user: username };
  db.collection("users").findOne(query, (err, results) => {
    if (err) throw err;
    console.log("results: ", results);

    if (results) {
      //console.log("User does not exist");

      // Check password
      if (results.password != password) {
        res.status(401).send("Invalid username or password");
        return;
      }
    } else {
      // Register the user
      console.log("User does not exist");

      let data = {
        user: username,
        password: password
      };

      db.collection("users")
        .insertOne(data)
        .then((result) => {
          console.log("User successfully created: " + result.insertedId);
        })
        .catch((err) => {
          console.error(err || `Error occurred when inserting data=${data}.`);
        });
    }

    let session = req.session;
    session.user = username;
    console.log(session);
    res.send(session.user);
  });
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;