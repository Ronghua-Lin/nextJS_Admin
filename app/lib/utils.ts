import mongoose from "mongoose";


// export const connectToDB = async () => {
  // try {
  //   await mongoose.connect(process.env.MONGODB_URL as string);
  // } catch (err) {
  //   throw new Error(`Database connection error: ${err as string}`);
  // }
// };


declare global {
  var mongoose: any
}

global.mongoose = {
  conn: null,
  promise: null,
};

export async function dbConnect() {
  try {
    if (global.mongoose && global.mongoose.conn) {
      console.log("Connected from previous");
      return global.mongoose.conn;
    } else {
      const conString = process.env.MONGODB_URL;

      const promise = mongoose.connect(conString as string, {
        autoIndex: true,
      });

      global.mongoose = {
        conn: await promise,
        promise,
      };

      console.log("database connected!");
      return await promise;
    }
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw new Error("Database connection failed");
  }
}

export const disconnect = () => {
  if (!global.mongoose.conn) {
    return;
  }
  global.mongoose.conn = null;
  mongoose.disconnect();
};