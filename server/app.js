const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const session = require("express-session");
const createError = require('http-errors');
/*  PASSPORT SETUP  */

const passport = require('passport');

app.use(passport.initialize());
app.use(passport.session());


const PORT = process.env.PORT || 8080;
var corsOptions = {
  origin: "http://localhost:8081",
  methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
  credentials:true
};

app.use(cors(corsOptions));

app.use(
  session({
    secret: "No secrete",
    saveUninitialized: true,
    cookie: {
      expires: new Date(253402300000000),
      //maxAge: 60000
      secure: false
    },
    resave: false
  })
);


// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:8081");
  res.setHeader("Access-Control-Allow-Credentials","true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//require("./passport/auth")(passport);


let mongoUtil = require("./db/mongoUtil.js");
mongoUtil.connectToServer(() => {
  require("./passport/auth")(passport);
  let authRouter = require("./passport/auth.js");
  let expenseRouter = require("./routes/expense.js");

  app.use("/expense",expenseRouter);
  // Routes
  app.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) throw err;
      if (!user){ 
        //res.send("No User Exists");
        console.log("invalid user");
        return res.redirect("/expense");
      }
      else {
        req.logIn(user, (err) => {
          if (err) throw err;
          res.send("Successfully Authenticated");
          console.log("found user",req.user);
        });
      }
    })(req, res, next);
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