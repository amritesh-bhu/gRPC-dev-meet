import grpc from "@grpc/grpc-js"
import { userDomain } from "../domain/user/index.js"

const viewProfile = async (call, callback) => {
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

const updateUserProfile = async (call, callback) => {
    try {

        const { emailId } = call.session
        const extractExplicitFields = (updates) => {
            const result = {}
            for (const key in updates) {
                if (key.startsWith('_')) continue
                result[key] = updates[key]
            }

            return result
        }

        const explicitUpdates = extractExplicitFields(call.request)

        const allowedUpdates = ['age', 'photoUrl', 'skills']
        const isAllowedUpdates = Object.keys(explicitUpdates).every((key) => allowedUpdates.includes(key))
        if (!isAllowedUpdates) {
            callback({ code: grpc.status.INTERNAL, details: "Invalid updates!!!" })
        }

        const updates = Object.fromEntries(Object.entries(explicitUpdates).filter(([_, value]) => value !== null))
        const message = await userDomain.updateUserProfile({ updates, emailId })
        callback(null, { success: message })
    } catch (err) {
        callback({ code: grpc.status.INTERNAL, details: err.message })
    }
}

export const rpcProfile = {
    viewProfile,
    updateUserProfile
}   