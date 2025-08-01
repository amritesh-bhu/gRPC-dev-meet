import grpc from "@grpc/grpc-js"
import { userDomain } from "../domain/user/index.js"
import { nanoid } from "nanoid"
import { sessions } from "../lib/session-in-memory.js"

const userSignUp = async (call, callback) => {
    try {
        const userInfo = call.request
        const response = await userDomain.registerUser(userInfo)
        callback(null, { response })

    } catch (err) {
        callback({ code: grpc.status.INTERNAL, details: err.message })
    }

}

const userLogin = async (call, callback) => {
    try {
        const { emailId, password } = call.request
        const user = await userDomain.authenticateUser({ emailId, password })
        if (!user) {
            throw new Error("Something went wrong!!!")
        }
        const sessionId = nanoid(10)
        sessions.set(sessionId, { emailId, createdAt: Date.now() })
        callback(null, {
            response: sessionId
        })
    } catch (err) {
        callback({ code: grpc.status.NOT_FOUND, details: err.message })
    }
}

const userLogOut = async (call, callback) => {
    try {
        sessions.delete(call.sessionId)
        callback(null, {
            response: "Loged out succesfully!!"
        })
    } catch (err) {
        callback({
            code: grpc.status.INTERNAL,
            details: "Something went wrong in user logout section!!"
        })
    }
}

export const rpcAuth = {
    userSignUp,
    userLogin,
    userLogOut
} 