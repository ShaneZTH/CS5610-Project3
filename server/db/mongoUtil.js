var MongoClient = require("mongodb").MongoClient;

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";
let _db;
const db_name = "savepiggie";

module.exports = {
  connectToServer: function (callback) {
    MongoClient.connect(uri, (err, client) => {
      console.log("MongoUtil URI: " + uri);
      if (err) {
        console.log(err);
      } else {
        _db = client.db(db_name);
        console.log("connected to: ", db_name);
        return callback(err);
      }
    });
  },

  getDb: function () {
    return _db;
  },
};
