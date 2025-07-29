import grpc from "@grpc/grpc-js"

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


export const rpcProfile = {
    viewProfile
}