import { Router } from 'express'
import { Server } from 'socket.io'
import { editUser, getUser, getUserByEmail, getUsers, updateUserStatus } from './user.controller'
import { ValidateJsonWenToken } from '../../middlewares/jwt-validator'
import { verifyJwt } from '../../utils/jwt'

export function UserRoutes(sockets?: any, server?: Server) {
    const router = Router()

    router.get('/', ValidateJsonWenToken, getUsers)
    router.get('/:id', ValidateJsonWenToken, getUser)
    router.get('/:email', ValidateJsonWenToken, getUserByEmail)
    router.post('/edit', ValidateJsonWenToken, editUser)

    sockets(server, (client: any) => {
        const [valid, uid] = verifyJwt(client.handshake.headers['authorization'])

        if (!valid) { return client.disconnect(); }

        updateUserStatus(uid, true)

        client.join(uid)


        client.on('disconnect', () => {
            updateUserStatus(uid, false)
        })
    })

    return router
}