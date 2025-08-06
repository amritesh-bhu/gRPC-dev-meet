import mongoose from "mongoose";

const connSchema = {
    toEmailId: {
        type: String,
        required: true,
        trim: true
    },
    fromEmailId: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        required: true
    }
}

const connModel = mongoose.model("connections", connSchema)