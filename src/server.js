import grpc from '@grpc/grpc-js';
import { HTTP_PORT } from './.secrets/env.js';

const server = new grpc.Server()

server.bindAsync(`0.0.0.0:${HTTP_PORT}`, grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err) {
        console.log('Couldn\'t start the server', err)
    } else {
        console.log(`Server started at Port ${port}`)
    }
})  