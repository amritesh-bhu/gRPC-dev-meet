import grpc from "@grpc/grpc-js"

const sendRequest = (call, callback) => {
    try {

        const { status, userId } = call.request
        const allowedStatus = ['Interested', 'Ignored']
        callback(null, { response: "Request Sent successfully!!" })
    } catch (error) {
        callback({ code: grpc.status.INTERNAL, details: "Something went wrong!!" })
    }
}