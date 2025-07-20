import grpc from '@grpc/grpc-js';
import { HTTP_PORT, MONGO_URI } from './.secrets/env.js';
import { dbConnection } from '../config/db-connection/db-conn.js';

await dbConnection(MONGO_URI)


const server = new grpc.Server()

server.bindAsync(`0.0.0.0:${HTTP_PORT}`, grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err) {
        console.log('Couldn\'t start the server', err)
    } else {
        console.log(`Server is listening on Port ${port}`)
    }
})