const express = require('express')
const router = express.Router();

const mongoUtil = require('../db/mongoUtil.js');
const db = mongoUtil.getDb();
const app = express();
  

router.post('/',function(req,res){
    var collection = 'expense'+req.session.user;
    db.collection(collection).insertOne(req.body);
    console.log(collection);
    res.status(204).send();
});

module.exports = router;