import mongoose from "mongoose";

export const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URI as string);
        console.log("MonogDB connected successfully");
    }
    catch(error){
        console.log("Error: ", error)
        process.exit(1);
    }
}