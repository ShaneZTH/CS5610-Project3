const express = require('express')
const router = express.Router();

const mongoUtil = require('../db/mongoUtil.js');
const db = mongoUtil.getDb();

router.post("/",function(req,res){
    var collection = 'rank';
    db.collection(collection).insertOne(req.body);
    console.log("post to",collection);
    res.status(204).send();
});

module.exports = router;