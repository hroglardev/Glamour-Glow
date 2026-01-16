import mongoose from "mongoose";
import { mongodb } from "./keys";

mongoose.set("bufferCommands", false);

export const connectDB = () => {
  return mongoose.connect(mongodb.URI, {
    serverSelectionTimeoutMS: 30000,
  });
};

