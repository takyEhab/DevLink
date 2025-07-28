import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("PLEASE SET MONGODB_URI inside env file.");
}

const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log(`CONNECTED TO DATABASE URI DEVELOPMENT MODE`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectToDatabase;
