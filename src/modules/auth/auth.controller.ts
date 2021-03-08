import { Request, Response } from 'express'
import bcryptjs from 'bcryptjs'
import { User } from '../user/user.model'
import { GenerateJsonWenToken } from './utils/jwt'
import { sendMailResetPasswordUtils } from './utils/mail'
import node2Fa from 'node-2fa'

export async function createUser(req: Request, res: Response) {
    try {
        const { email, password } = req.body;
        const userExist = await User.findOne({ email })
        if (userExist) return res.status(400).json({ ok: false, error: 'email already taken' })
        const user = new User(req.body)
        const salt = bcryptjs.genSaltSync()
        user.password = bcryptjs.hashSync(password, salt)
        await user.save()
        const token = await GenerateJsonWenToken({ email: user.email, uid: user.id })
        res.status(201).json({ ok: true, user, token })
    } catch (error) {
        res.status(500).json({ ok: false, error })
    }
}

export async function findUserAndLogin(req: Request, res: Response) {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email })
        if (!user) return res.status(404).json({ ok: false, error: 'user not found' })
        const validatePassword = bcryptjs.compareSync(password, user.password)
        if (!validatePassword) return res.status(400).json({ ok: false, error: 'email or password incorrect' })
        const token = await GenerateJsonWenToken({ email: user.email, uid: user.id })
        res.json({ ok: true, user, token })
    } catch (error) {
        res.status(500).json({ ok: false, error })
    }
}

export async function renewToken(req: Request, res: Response) {
    try {
        const { email, uid } = req.body
        const token = await GenerateJsonWenToken({ email, uid })
        const user = await User.findById(uid)
        res.json({ ok: true, user, token })
    } catch (error) {
        res.status(500).json({ ok: false, error })
    }
}

export async function sendMailResetPassword(req: Request, res: Response) {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) return res.status(404).json({ ok: false, error: 'user not found' })
        const token = await GenerateJsonWenToken({ email: user.email, uid: user.id })
        const code: any = node2Fa.generateToken(token)
        await sendMailResetPasswordUtils({ email: user.email, code: code?.token })
        res.json({ ok: true, user: user.email })
    } catch (error) {
        res.status(500).json({ ok: false, error })
    }
}

export async function verifyResetPasswordCode(req: Request, res: Response) {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) return res.status(404).json({ ok: false, error: 'user not found' })
        const token = await GenerateJsonWenToken({ email: user.email, uid: user.id })
        const code = node2Fa.verifyToken(req.body.code)
        if (code.delta === 0) {
            res.json({ ok: true, token })
        } else {
            res.status(401).json({ ok: false, code: false })
        }
    } catch (error) {
        res.status(500).json({ ok: false, error })
    }
}