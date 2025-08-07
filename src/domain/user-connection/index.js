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

export const createConnection = async ({ fromEmailId, toEmailId, status }) => {

    const isAlreadyFriend = await connModel.findOne({
        $or: [
            { fromEmailId, toEmailId },
            { fromEmailId: toEmailId, toEmailId: fromEmailId }
        ]
    })

    console.log(isAlreadyFriend)
    if (isAlreadyFriend) {
        throw new Error("Already have connection!!")
    }

    const newConnection = await connModel.create({ fromEmailId, toEmailId, status })
    if (!newConnection) {
        throw new Error("Not able to create connection request!!")
    }

    return "connection created!!"
}


export const connDomain = {
    createConnection
}