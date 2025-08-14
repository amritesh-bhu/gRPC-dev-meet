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

    if (isAlreadyFriend) {
        return "connection already exist!!"
    }

    const newConnection = await connModel.create({ fromEmailId, toEmailId, status })
    if (!newConnection) {
        throw new Error("Not able to create connection request!!")
    }

    return "connection created!!"
}

const updateConnectionStatus = async ({ logedInUserEmail, id, status }) => {

    const isInterested = await connModel.findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(id), toEmailId: logedInUserEmail, status: "Interested" }
        , { $set: { status } }, { new: true }
    )

    console.log("isInterested", isInterested)

    if (!isInterested) {
        return "Connection does not exist!!!"
    }

    return "status updated Successfully!!"
}


export const connDomain = {
    createConnection,
    updateConnectionStatus
}