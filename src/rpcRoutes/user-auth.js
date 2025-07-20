import grpc from "@grpc/grpc-js"
import { userDomain } from "../domain/user/index.js"

export const userSignUp = async (call, callback) => {
    try {

        const userInfo = call.request
        const response = await userDomain.registerUser(userInfo)
        callback(null, { response })

    } catch (err) {
        callback({ code: grpc.status.INTERNAL, details: err.message })
    }

}

export const rpcAuth = {
    userSignUp
} 