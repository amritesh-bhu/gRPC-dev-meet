import grpc from "@grpc/grpc-js"
import { userDomain } from "../domain/user"

const sendRequest = async (call, callback) => {

    try {
        const logedInUserId = call.user

        const { status, emailId } = call.request

        const isSenderExist = await userDomain.isUserExist({ emailId })
        if (!isSenderExist) {
            callback({ code: grpc.status.NOT_FOUND, details: "User with this email does not exist!!!" })
        }

        const allowedStatus = ['Interested', 'Ignored']
        const isAllowedStatus = allowedStatus.includes(status)
        callback(null, { response: "Request Sent successfully!!" })
    } catch (error) {
        callback({ code: grpc.status.INTERNAL, details: "Something went wrong!!" })
    }
}