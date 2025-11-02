import mongoose from "mongoose";

export default async function connectDb(url) {
  try {
    console.log("MongoDB esta conectado correctamente");
    return await mongoose.connect(url);
  } catch (error) {
    console.log(`Error al conectar la base de datos: ${error.message}`);
  }
}

