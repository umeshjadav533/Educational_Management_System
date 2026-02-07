import mongoose from "mongoose";

const connectDB = async () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "educational_management_system"
    }).then(() => {
        console.log("Connected to database");
    }).catch((err) => {
        console.log("Database connection failed.", err);
    })
}

export default connectDB;