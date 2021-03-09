import express, { Application, urlencoded, json } from 'express'
import { createServer } from 'http'
import morgan from 'morgan'
import { Server as SocketServer } from 'socket.io'

import { modules } from './modules'

export function Server(callback: any) {
    const app: Application = express()
    const server = createServer(app)
    const io = new SocketServer(server)

    app.set('port', process.env.PORT || 3000)

    app.use(morgan('dev'))
    app.use(json())
    app.use(urlencoded({ extended: true }))

    modules(app, io)

    const port = app.get('port')

    server.listen(port, callback(port))

    return io
}