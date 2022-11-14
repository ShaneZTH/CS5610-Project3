const express = require('express')
const router = express.Router();

const mongoUtil = require('../db/mongoUtil.js');
const db = mongoUtil.getDb();
const app = express();
  

router.post('/',function(req,res){
    var collection = 'expense'+req.session.passport.user.user;
    db.collection(collection).insertOne(req.body);
    console.log("collection name",collection);
    res.status(204).send();
});

router.get('/',(req,res)=>{
    console.log("my session",req.session.passport);
    res.status(204).send();
}
)
module.exports = router;