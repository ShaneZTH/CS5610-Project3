const express = require("express");
const cors = require("cors");
const app = express();
const session = require("express-session");
const PORT = process.env.PORT || 8080;
var corsOptions = {
  origin: "http://127.0.0.1:3000",
};

//app.use(cors(corsOptions));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(
  session({
    secret: "No secrete",
    saveUninitialized: true,
    cookie: {
      expires: new Date(253402300000000)
      //maxAge: 60000
      // ,secure: false
    },
    resave: false
  })
);


// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "hello world" });
});

// set port, listen for requests
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

let mongoUtil = require("./db/mongoUtil.js");
mongoUtil.connectToServer(() => {
  let authRouter = require("./routes/auth.js");

 // app.use("/", router);
  app.use("/", authRouter);


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