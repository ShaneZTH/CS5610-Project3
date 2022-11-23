const { MongoClient } = require("mongodb");

function myMongoDb() {
  const myDB = {};
  const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";
  console.log("uri ", uri);
  const DB_NAME = "PROJECT-3";

  const COLLECTION_SPENDING = "spending";
  const COLLECTION_TIP = "tip";

  // CRUD
  myDB.addUserTip = async (data = {}) => {
    let client;
    console.log("addUserTip data: ", data); // FIXME

    try {
      client = new MongoClient(uri);
      const tipCol = client.db(DB_NAME).collection(COLLECTION_TIP);

      const query = { user: data.user };
      const update = { $set: { user: data.user, tip: data.tip } };
      const options = { upsert: true };

      const numModified = await tipCol.updateOne(query, update, options);
      console.log("db resp: ", numModified);

      if (!numModified) {
        throw new Error("The document wasn't updated");
      }

      const updatedItem = await myDB.getUserTip(query);
      return updatedItem;
    } catch (err) {
      return "Error occured in addingTip." + err;
    } finally {
      console.log("addTip: Closing db connection");
      client.close();
    }
  };

  myDB.getUserTip = async (query = {}) => {
    let client;

    try {
      client = new MongoClient(uri);
      const tipCol = client.db(DB_NAME).collection(COLLECTION_TIP);

      return await tipCol.find(query).toArray();
    } finally {
      console.log("getUserTip: Closing db connection");
      client.close();
    }
  };

  myDB.createSpendingRecord = async (data = {}) => {
    let client;

    try {
      client = new MongoClient(uri);
      const spendingCol = client.db(DB_NAME).collection(COLLECTION_SPENDING);

      return spendingCol.insertOne(data, (err, resp) => {
        let ret;
        if (err) ret = "Error occured in createSpending";
        else ret = "Inserted spending" + data;

        return ret;
      });
    } finally {
      console.log("createSpending: Closing db connection");
      client.close();
    }
  };

  myDB.searchSpendingRecord = async (query = {}) => {
    let client;

    try {
      client = new MongoClient(uri);
      const spendingCol = client.db(DB_NAME).collection(COLLECTION_SPENDING);

      return await spendingCol.find(query).toArray();
    } finally {
      console.log("searchSpending: Closing db connection");
      client.close();
    }
  };

  // Could be replaced by search
  // myDB.getUserSpending = async (user) => {
  //   let client;
  //   const query = { user: user };

  //   try {
  //     client = new MongoClient(uri);
  //     const spendingCol = client.db(DB_NAME).collection(COLLECTION_SPENDING);

  //     return await spendingCol.find(query).toArray();
  //   } finally {
  //     console.log("getSpending: Closing db connection");
  //     client.close();
  //   }
  // };

  return myDB;
}

module.exports = myMongoDb();
