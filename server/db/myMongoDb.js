import { MongoClient } from "mongodb";

function myMongoDb() {
  const myDB = {};
  const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";
  const DB_NAME = "PROJECT-3";

  const COLLECTION_SPENDING = "spending";

  myDB.getSpending = async (userId) => {
    let client;
    const query = { user: userId };

    try {
      client = new MongoClient(uri);
      const spendingCol = client.db(DB_NAME).collection(COLLECTION_SPENDING);

      return await spendingCol.find(query).toArray();
    } finally {
      console.log("getSpending: Closing db connection");
      client.close();
    }
  };

  return myDB;
}

export default myMongoDb();
