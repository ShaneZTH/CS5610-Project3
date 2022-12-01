const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();

const session = require("express-session");
const createError = require("http-errors");
const path = require("path");
const bodyParser = require("body-parser");
const proxy = require("express-http-proxy");

/*  PASSPORT SETUP  */
const passport = require("passport");
require("dotenv").config();

const PORT = process.env.PORT || 8080;

var corsOptions = {
  origin: "http://localhost:3000",
  methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD", "DELETE"],
  credentials: true,
};

//*Set static folder up in production
app.use(express.static(path.join(__dirname, "../client/build")));

app.use(express.static(path.join(__dirname, "public")));
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.json());

app.use(
  session({
    key: "user-id",
    name: "yay-session",
    secret: "No secrete",
    saveUninitialized: false,
    proxy: true,
    resave: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "hello world" });
});

////////////////////////////////////
// Routing
////////////////////////////////////
app.listen(process.env.PORT || PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

let mongoUtil = require("./db/mongoUtil.js");
mongoUtil.connectToServer(() => {
  const passportConfig = require("./passport/auth")(passport);
  let authRouter = require("./passport/auth.js");
  let expenseRouter = require("./routes/expense.js");
  let budgetRouter = require("./routes/budget.js");
  let rankRouter = require("./routes/rank.js");
  let rankstatusRouter = require("./routes/rankstatus.js");
  let tipRouter = require("./routes/tipRoutes");

  app.use("/expense", expenseRouter);
  app.use("/budget", budgetRouter);
  app.use("/rank", rankRouter);
  app.use("/rankstatus", rankstatusRouter);
  app.use("/api/tip", tipRouter);
  //You use different routes for different pages/functions. What about using a seperate router file for user's functionality?
  // Routes
  app.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) throw err;
      if (!user) {
        res.status(500).send();
      } else {
        req.logIn(user, (err) => {
          if (err) throw err;
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

module.exports = app;
