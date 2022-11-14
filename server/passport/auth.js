const router = require("express").Router();
const mongoUtil = require("../db/mongoUtil.js");
const db = mongoUtil.getDb();

const express = require('express')
const app = express()

const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy


const authUser =(username,password,done)=>{
    // Authenticate the User
    const query = { user: username };
    db.collection("users").findOne(query, (err, results) => {
      if (err) throw err;
      console.log("results: ", results);
  
      if (results) {
        //console.log("User does not exist");
  
        // Check password
        if (results.password != password) {
          //res.status(401).send("Invalid username or password");
          return done(null,false);
        }else{
          return done(null,results);
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
        db.collection("users").findOne(query,(err,user)=>{
          return done(null,user);
        })
        
        
      }
    });
    //return done(null,results);
}

module.exports = function (passport){

  passport.use(new LocalStrategy(authUser));

  passport.serializeUser( (user, done) => { 
    console.log(`--------> Serialize User`)
    console.log(user)     

    done(null, user)
  })

  passport.deserializeUser((user, done) => {
    console.log("---------> Deserialize Id")
    done(null.user)


}) ;


// Simple Login
/* router.post("/login", (req, res) => {
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
}); */

};

