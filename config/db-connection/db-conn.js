import mongoose from "mongoose";

export const dbConnection = async (MONGO_URI) => {
    try {
        await mongoose.connect(MONGO_URI)
        console.log('Database connected Successfully')
    } catch (err) {
        throw new Error("Error from dataase connection", err)
    }
}