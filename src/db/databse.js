import mongoose from 'mongoose';
const DB_Name = "playground";

const connectDB = async()=>{
    try {

        const connectionInstance = await mongoose.connect(`${process.env.DB_URL}/${DB_Name}`);
        console.log(connectionInstance.connection.host);
        
    } catch (error) {
        console.log("MongoDB connection FAILED", error);
        process.env(1);        
    }
}

export  default connectDB;