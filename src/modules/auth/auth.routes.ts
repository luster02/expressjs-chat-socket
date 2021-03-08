import { Router } from 'express'
import { check } from 'express-validator'
import { createUser, findUserAndLogin, renewToken, sendMailResetPassword, verifyResetPasswordCode } from './auth.controller'
import { ValidateJsonWenToken } from '../../middlewares/jwt-validator'
import { FieldValidator } from '../../middlewares/express-validator'

export function AuthRoutes() {
    const router = Router()

    router.post('/register', [
        check('name', 'name is required').not().isEmpty(),
        check('password', 'password is required').not().isEmpty(),
        check('email', 'email is required').isEmail(),
        FieldValidator
    ], createUser)

    router.post('/login', [
        check('password', 'password is required').not().isEmpty(),
        check('email', 'email is required').isEmail(),
        FieldValidator
    ], findUserAndLogin)

    router.post('/reset', [
        check('email', 'email is required').isEmail(),
        FieldValidator
    ], sendMailResetPassword)

    router.post('/reset-verify', [
        check('code', 'code is required').not().isEmpty(),
        check('email', 'email is required').isEmail(),
        FieldValidator
    ], verifyResetPasswordCode)

    router.get('/renew', ValidateJsonWenToken, renewToken)

    return router
}