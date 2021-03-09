import { Application } from 'express'
import { Server } from 'socket.io'

import main from './main.routes'
import { AuthRoutes } from './auth/auth.routes'
import { UserRoutes } from './user/user.routes'
import { MessageRoutes } from './messages/message.routes'

function sockets(server?: Server, functions?: any) {
    server?.on('connection', client => {
        functions(client)
    })
}

export function modules(app: Application, server?: Server) {

    app.use('/', main())
    app.use('/auth', AuthRoutes())
    app.use('/user', UserRoutes(sockets, server))
    app.use('/messages', MessageRoutes(sockets, server))

    return app
}