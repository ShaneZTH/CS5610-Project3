const express = require("express");
const cors = require("cors");
const app = express();
var corsOptions = {
  origin: "http://localhost:8081",
};

const PORT = process.env.PORT || 8080;
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
require("dotenv").config();

// Set Favicon
app.get("/favicon.ico", (req, res) => {
  // res.sendFile(path.join(__dirname + "/public/images/favicon.ico"));
  // TODO: find a favicon
  console.log("TODO");
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "hello world" });
});

////////////////////////////////////
// Routing
////////////////////////////////////

let spendingRouter = require("./routes/spending-router");

app.use("/api/spending", spendingRouter);

////////////////////////////////////

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
