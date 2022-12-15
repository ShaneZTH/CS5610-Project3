const router = require("express").Router();

// Routes
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) {
      res.status(500).send();
      // return res.redirect("/login");
    } else {
      req.logIn(user, (err) => {
        if (err) throw err;
        console.log("User login success ");
        console.log(user);

        res.send("Successfully Authenticated");
      });
    }
  })(req, res, next);
});

router.get("/user", (req, res) => {
  console.log("get session", req.user.user);
  res.status(204).send(req.user.user); // The req.user stores the entire user that has been authenticated inside of it.
});

router.get("/auth", (req, res) => {
  if (req.isAuthenticated()) {
    console.log("Auth: " + req.user.user);
    res.status(200).send({ success: true, message: "OK", user: req.user.user });
  } else {
    console.log("No auth");
    res.status(401).send({ success: false, message: "BAN" });
  }
});

router.get("/logout", (req, res, next) => {
  console.log("User logged out: ", req.session);
  req.session.destroy((err) => {
    if (err) {
      return next(err);
    }
    res.status(204).send();
  });
});

module.exports = router;
