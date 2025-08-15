import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
import { AUTH_PROTO, CONN_PROTO, HTTP_PORT, MONGO_URI, PROFILE_PROTO } from './.secrets/env.js';
import { dbConnection } from '../config/db-connection/db-conn.js';
import { rpcAuth } from './rpcRoutes/user-auth.js';
import { withAuth } from './interceptors/session-check.js';
import { rpcProfile } from './rpcRoutes/user-profile.js';
import { rpcConnection } from './rpcRoutes/user-request.js';

await dbConnection(MONGO_URI)

const packageDefinition = protoLoader.loadSync([AUTH_PROTO, PROFILE_PROTO, CONN_PROTO], {
    keepCase: true,
    oneofs: true,
    default: true,
    longs: String,
    enums: String,
})

const proto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server()

server.addService(proto.auth.AuthService.service, {
    UserSignUp: rpcAuth.userSignUp,
    UserLogIn: rpcAuth.userLogin,
    userLogOut: withAuth(rpcAuth.userLogOut)
})

server.addService(proto.profile.ProfileService.service, {
    ViewProfile: withAuth(rpcProfile.viewProfile),
    UpdateProfile: withAuth(rpcProfile.updateUserProfile)
})
    
server.addService(proto.userConnReq.ConnService.service, {
    SendRequest: withAuth(rpcConnection.sendConnRequest),
    UpdateStatus: withAuth(rpcConnection.updateStatus),
    AcceptedConnections: withAuth(rpcConnection.acceptedConnections)
})

server.bindAsync(`0.0.0.0:${HTTP_PORT}`, grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err) {
        console.log('Couldn\'t start the server', err)
    } else {
        console.log(`Server is listening on Port ${port}`)
    }
})