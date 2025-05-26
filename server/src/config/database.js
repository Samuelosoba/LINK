import mongoose from "mongoose";

const mongoUri = process.env.MONGODB_URL;
if (!mongoUri) {
  throw new Error("MONGO_URI environment variable is not definfed");
}
let connection = {};
const connectToDb = async () => {
  try {
   
    if (connection.isConnected) {
      console.log("already connected to the database");
      return;
    }
   
    const db = await mongoose.connect(mongoUri, {
      dbName: "LINKS",
      serverSelectionTimeoutMS: 45000,
      socketTimeoutMS: 5000,
    });
    connection.isConnected = db.connections[0].readyState === 1;
    if (connection.isConnected) {
      console.log("mongodb has connected succesfully");
      
      mongoose.connection.on("error", (err) => {
        console.error("Mongodb connection error", err);
      });
      mongoose.connection.on("disconnected", () => {
        console.log("Mongodb disconnected");
        connection.isConnected = false;
      });
      
      process.on("SIGINT", async () => {
        await mongoose.connection.close();
        console.log("Mongodb connection closed through app termination");
        process.exit(0);
      });
    }
  } catch (error) {
    console.error("Mongodb connection failed", error.message);
    connection.isConnected = false;
    throw new Error("Failed to connect to mongodb", error.message);
  }
};
export default connectToDb;
