import { Router } from 'express'
import { editUser, getUser, getUserByEmail, getUsers } from './user.controller'
import { ValidateJsonWenToken } from '../../middlewares/jwt-validator'

export function UserRoutes() {
    const router = Router()

    router.get('/', ValidateJsonWenToken, getUsers)
    router.get('/:id', ValidateJsonWenToken, getUser)
    router.get('/:email', ValidateJsonWenToken, getUserByEmail)
    router.post('/edit', ValidateJsonWenToken, editUser)

    return router
}