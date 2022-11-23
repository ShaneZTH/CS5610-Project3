const express = require('express')
const router = express.Router();

const mongoUtil = require('../db/mongoUtil.js');
const db = mongoUtil.getDb();

router.get("/",(req,res)=>{
    var collection = "budget"+req.user.user;
    console.log("get from budget collection", collection);
    db.collection(collection).find().toArray((err,result)=>{
        if (err) return console.log(err);
        res.status(200).json(result);;
    });
});

module.exports = router;