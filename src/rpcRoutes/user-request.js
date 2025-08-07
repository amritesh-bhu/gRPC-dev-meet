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


export const rpcConnection = {
    sendConnRequest
}