import mongoose from "mongoose";

const connSchema = {
    toEmailId: {
        type: String,
        required: true,
        trim: true,
        ref: "user"
    },
    fromEmailId: {
        type: String,
        required: true,
        trim: true,
        ref: "user"
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

    if (!isInterested) {
        return "Connection does not exist!!!"
    }

    return "status updated Successfully!!"
}

const getAcceptedConnections = async ({ emailId }) => {

    console.log(emailId)

    const friends = await connModel.find({
        $or: [
            { fromEmailId: emailId },
            { toEmailId: emailId }
        ], status: "Accepted"
    }).populate("fromEmailId", "firstName lastName")
        .populate("toEmailId", "firstName lastName")

    console.log("connections ", friends)
    return connections
}


export const connDomain = {
    createConnection,
    updateConnectionStatus,
    getAcceptedConnections
}