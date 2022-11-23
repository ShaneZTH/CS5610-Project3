const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();

const session = require("express-session");
const createError = require("http-errors");
const path = require("path");
const bodyParser = require("body-parser");
const proxy = require("express-http-proxy");
const passport = require("passport");
require("dotenv").config();

const PORT = process.env.SERVER_PORT || 8080;

// middlewares
var corsOptions = {
  origin: "http://localhost:8081",
  methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD", "DELETE"],
  credentials: true
};
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.json());
let memoryStore = session.MemoryStore();
app.use(
  session({
    key: "user-id",
    name: "yay-session",
    secret: "No secrete",
    saveUninitialized: false,
    proxy: true,
    cookie: {
      maxAge: 60000,
      httpOnly: false,
      secure: true,
      sameSite: "none"
    },
    store: memoryStore,
    resave: false
  })
);
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:8081");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "../client/build")));

/*  PASSPORT SETUP  */
app.use(passport.initialize());
app.use(passport.session());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

////////////////////////////////////
// Routing
////////////////////////////////////

let spendingRouter = require("./routes/spending-router");
let tipRouter = require("./routes/tipRoutes");
app.use("/api/spending", spendingRouter);
app.use("/api/tip", tipRouter);

let mongoUtil = require("./db/mongoUtil.js");
mongoUtil.connectToServer(() => {
  const passportConfig = require("./passport/auth")(passport);
  let authRouter = require("./passport/auth.js");
  let expenseRouter = require("./routes/expense.js");
  let budgetRouter = require("./routes/budget.js");
  let rankRouter = require("./routes/rank.js");

  app.use("/expense", expenseRouter);
  app.use("/budget", budgetRouter);
  app.use("/rank", rankRouter);
  // Routes
  app.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) throw err;
      if (!user) {
        console.log("invalid user");
        return res.redirect("/");
      } else {
        req.logIn(user, (err) => {
          if (err) throw err;
          console.log("found user", req.user);
          res.send("Successfully Authenticated");
        });
      }
    })(req, res, next);
  });

  app.get("/user", (req, res) => {
    console.log("get session", req.user.user);
    res.status(204).send(req.user.user); // The req.user stores the entire user that has been authenticated inside of it.
  });

  app.get("/logout", (req, res, next) => {
    console.log("log out user", req.session);
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      }
      res.status(204).send();
      //return res.redirect("/expense");
    });
  });

  // Forward 404 to error handler
  app.use(function (req, res, next) {
    next(createError(404));
  });

  // Error handler
  app.use(function (err, req, res) {
    res.locals.message = err.message;
    res.locals.error = err || "MongoDB connection error.";
    res.status(err.status || 500);
    res.render("error");
  });
});

// Handles any requests that don't match the ones above
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

module.exports = app;
