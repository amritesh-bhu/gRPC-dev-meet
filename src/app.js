import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
import { HTTP_PORT, MONGO_URI, PROTO_PATH } from './.secrets/env.js';
import { dbConnection } from '../config/db-connection/db-conn.js';
import { rpcAuth } from './rpcRoutes/user-auth.js';

await dbConnection(MONGO_URI)

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    oneofs: true,
    default: true,
    longs: String,
    enums: String,

})

const authProto = grpc.loadPackageDefinition(packageDefinition).auth;

const server = new grpc.Server()

server.addService(authProto.AuthService.service, {
    UserSignUp: rpcAuth.userSignUp,
    UserLogIn: rpcAuth.userLogin
})

server.bindAsync(`0.0.0.0:${HTTP_PORT}`, grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err) {
        console.log('Couldn\'t start the server', err)
    } else {
        console.log(`Server is listening on Port ${port}`)
    }
})