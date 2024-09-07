import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Connected to MongoDB at ${connection.host}`.bgMagenta.white);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`.bgRed.white);
    process.exit(1); 
  }
};

export default connectDB;
