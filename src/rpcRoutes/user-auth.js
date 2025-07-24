import grpc from "@grpc/grpc-js"
import { userDomain } from "../domain/user/index.js"
import { nanoid } from "nanoid"

export const userSignUp = async (call, callback) => {
    try {

        const userInfo = call.request
        const response = await userDomain.registerUser(userInfo)
        callback(null, { response })

    } catch (err) {
        callback({ code: grpc.status.INTERNAL, details: err.message })
    }

}

export const userLogin = async (call, callback) => {
    try {
        const { emailId, password } = call.request
        const user = await userDomain.authenticateUser({ emailId, password })
        if (!user) {
            throw new Error("Something went wrong!!!")
        }
        const sessions = new Map()
        const sessionId = nanoid(10)
        sessions.set(sessionId, { emailId, createdAt: Date.now() })
        callback(null, {
            sessionId
        })
    } catch (err) {
        callback({ code: grpc.status.NOT_FOUND, details: err.message })
    }
}

export const rpcAuth = {
    userSignUp,
    userLogin
} 