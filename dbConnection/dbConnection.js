import { MongoClient } from "mongodb";

// Connection URL
const client = new MongoClient(
  "mongodb+srv://monyradwan33:dKGser5mHGi7r4Sa@noderoute.4vmin5r.mongodb.net/"
);

// Database Name
const dbName = "car_rental";

// Use connect method to connect to the server
client
  .connect()
  .then(() => console.log("Connected successfully to mongodb"))
  .catch((err) => console.log("there is an error", err));

const db = client.db(dbName);

export default db;
