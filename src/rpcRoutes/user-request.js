import grpc from "@grpc/grpc-js"
import { userDomain } from "../domain/user/index.js"
import { connDomain } from "../domain/user-connection/index.js  "

const sendConnRequest = async (call, callback) => {

    try {
        const logedInUser = call.user
        const { status, emailId } = call.request

        const isSenderExist = await userDomain.isUserExist({ emailId })
        if (!isSenderExist) {
            callback({ code: grpc.status.NOT_FOUND, details: "User with this email does not exist!!!" })
        }

        const allowedStatus = ['Interested', 'Ignored']
        const isAllowedStatus = allowedStatus.includes(status)
        if (!isAllowedStatus) {
            callback({ code: grpc.status.FAILED_PRECONDITION, details: "Invalid status sent!!" })
        }

        const newConnection = await connDomain.createConnection({ fromEmailId: logedInUser.emailId, toEmailId: emailId, status })

        callback(null, { success: newConnection })
    } catch (error) {
        callback({ code: grpc.status.INTERNAL, details: "Something went wrong!!" })
    }
}

const updateStatus = async (call, callback) => {
    try {

        const { id, status } = call.request
        const logedInUser = call.user
        const logedInUserEmail = logedInUser.emailId

        const allowedStatusUpdate = ["Accepted", "Rejected"]
        const isValidStatus = allowedStatusUpdate.includes(status)
        if (!isValidStatus) {
            throw new Error("Status is not valid!!")
        }

        const response = await connDomain.updateConnectionStatus({ logedInUserEmail, id, status })

        if (!response) {
            throw new Error("Something went wrong while updating status!!")
        }

        callback(null, { success: response })
    } catch (error) {
        callback({ code: grpc.status.INTERNAL, details: error.message })
    }
}

const acceptedConnections = async (call, callback) => {
    try {

        const { emailId } = call.user
        console.log("emailid ", emailId)
        const connections = await connDomain.getAcceptedConnections({ emailId })
        console.log("connections rpc", connections)
        callback(null, {
            connections
        })
    } catch (error) {
        callback({ code: grpc.status.INTERNAL, details: error })
    }
}

export const rpcConnection = {
    sendConnRequest,
    updateStatus,
    acceptedConnections
}       