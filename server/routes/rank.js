const express = require('express')
const router = express.Router();

const mongoUtil = require('../db/mongoUtil.js');
const db = mongoUtil.getDb();

router.post("/",function(req,res){
    var collection = 'ranktest';
    var query = {'username':req.body.username};
    db.collection(collection).findOneAndReplace(query,req.body,{upsert:true},function(err,doc){
        if (err) return res.send(500, {error: err});
        return res.status(204).send();
    });
    
});

module.exports = router;