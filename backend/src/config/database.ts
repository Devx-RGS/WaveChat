import mongoose from "mongoose";

export const connectDB = async () => {
    try{
        const mongoUri = process.env.MONGODB_URI;
        if(!mongoUri) {
            throw new Error("MONGODB_URI environment variable is not defined");
        }

        await mongoose.connect(mongoUri);
        console.log("MonogDB connected successfully");
    }
    catch(error){
        console.log("Error: ", error)
        process.exit(1);
    }
}