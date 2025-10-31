import mongoose from "mongoose";
export default async function connectDb(url) {
  try {
    console.log("Database is connected");
    return await mongoose.connect(url);
  } catch (error) {
    console.log(`Error ${error.message}`);
  }
}
