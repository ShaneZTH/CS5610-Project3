const router = require("express").Router();
const mongoUtil = require("../db/mongoUtil.js");
const db = mongoUtil.getDb();
ObjectId = require("mongodb").ObjectID;

const express = require("express");
const app = express();

const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const authUser = (username, password, done) => {
  // Authenticate the User
  const query = { user: username };
  db.collection("users").findOne(query, async (err, results) => {
    if (err) throw err;
    console.log("results: ", results);

    if (results) {
      if (results.password != password) {
        //res.status(401).send("Invalid username or password");
        return done(null, false);
      } else {
        return done(null, results);
      }
    } else {
      // Register the user
      console.log("User does not exist");

      let data = {
        user: username,
        password: password,
      };

      db.collection("users")
        .insertOne(data)
        .then((result) => {
          console.log("User successfully created: " + result);
          db.collection("users").findOne(query, async (err, user) => {
            await console.log("Found user after registry", user);
            return done(null, user);
          });
        })
        .catch((err) => {
          console.error(err || `Error occurred when inserting data=${data}.`);
        });
    }
  });
};

module.exports = function (passport) {
  passport.use(new LocalStrategy(authUser));

  passport.serializeUser(function (user, done) {
    console.log("\n<-------- Serialize User -------->");
    console.log(user);
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    console.log("\n<--------- Deserialize Id -------->");
    var o_id = new ObjectId(id);
    db.collection("users").findOne({ _id: o_id }, (err, user) => {
      console.log("retrieved user: ", user.user);
      done(err, user);
    });
  });
};
