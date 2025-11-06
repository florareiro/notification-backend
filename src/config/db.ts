import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "";

export async function connectDB() {
  if (!MONGO_URI) {
    throw new Error("MONGO_URI não está definido nas variáveis de ambiente");
  }
  await mongoose.connect(MONGO_URI);
  console.log("MongoDB conectado");
}

export async function disconnectDB() {
  await mongoose.disconnect();
}
