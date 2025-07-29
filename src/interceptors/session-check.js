import grpc from '@grpc/grpc-js'
import { sessions } from '../lib/session-in-memory.js'

const userSessionCheck = async (call, callback, next) => {
    try {
        const metadata = call.metadata
        const sessionId = metadata.get('session_id')[0]
        const session = sessions.get(sessionId)
        if (!session) {
            callback({
                code: grpc.status.UNAUTHENTICATED,
                details: "Unauthenticated user!!"
            })
        }
        call.session = session
        call.sessionId = sessionId
        next()
    } catch (error) {
        callback({
            code: grpc.status.INTERNAL,
            details: "Unauthenticated user!!"
        })
    }
}

export const withAuth = (handler) => {
    return (call, callback) => userSessionCheck(call, callback, () => handler(call, callback))
}