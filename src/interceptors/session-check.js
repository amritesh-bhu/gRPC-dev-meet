import grpc from '@grpc/grpc-js'
import { sessions } from '../lib/session-in-memory.js'
import { userDomain } from '../domain/user/index.js'

const userSessionCheck = async (call, callback, next) => {
    try {
        const metadata = call.metadata
        const sessionId = metadata.get('session_id')[0]
        const session = sessions.get(sessionId)
        const { emailId } = session
        const user = await userDomain.viewProfile({ emailId })
        if (!session) {
            callback({
                code: grpc.status.UNAUTHENTICATED,
                details: "Unauthenticated user!!"
            })
        }
        call.user = user
        call.sessionId = sessionId
        next()
    } catch (error) {
        callback({
            code: grpc.status.INTERNAL,
            details: error.message
        })
    }
}

export const withAuth = (handler) => {
    return (call, callback) => userSessionCheck(call, callback, () => handler(call, callback))
}