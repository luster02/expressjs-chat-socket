import { Router } from 'express'
import { Server } from 'socket.io'
import { check } from 'express-validator'
import { CreateRestMessage, GetMessages, CreateIoMessage } from './message.controller'
import { ValidateJsonWenToken } from '../../middlewares/jwt-validator'
import { FieldValidator } from '../../middlewares/express-validator'

export function MessageRoutes(sockets?: any, server?: Server) {
    const router = Router()

    router.post('/', [
        check(['to', 'from', 'body'], 'all fields are required').not().isEmpty(),
        FieldValidator,
        ValidateJsonWenToken
    ], CreateRestMessage)

    router.get('/', ValidateJsonWenToken, GetMessages)

    sockets(server, (client: any) => {

        client.on('personal-message', async (payload: any) => {
            await CreateIoMessage(payload)
            server?.to(payload.to).emit('personal-message', payload)
        })

    })

    return router
}