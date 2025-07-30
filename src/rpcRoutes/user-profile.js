import grpc from "@grpc/grpc-js"
import { userDomain } from "../domain/user/index.js"

export const viewProfile = async (call, callback) => {
    try {
        const { emailId } = call.session
        const user = await userDomain.viewProfile({ emailId })
        callback(null, {
            firstName: user.firstName,
            lastName: user.lastName,
            emailId: user.emailId,
            age: user.age,
            gender: user.gender,
            skills: user.skills,
            photoUrl: user.photoUrl
        })
    } catch (err) {
        callback({ code: grpc.status.INTERNAL, details: err.message })
    }
}

export const updateUserProfile = async (call, callback) => {
    try {

        const allowedUpdates = ['age', 'photoUrl', 'skills']

        const isAllowedUpdates = Object.keys(call.request).every((key) => allowedUpdates.includes(key))

        if (!isAllowedUpdates) {
            callback({ code: grpc.status.INTERNAL, details: "Invalid updates!!!" })
        }

    } catch (err) {

    }
}

export const rpcProfile = {
    viewProfile
}