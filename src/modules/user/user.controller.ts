import { Request, Response } from 'express'
import { User } from './user.model'

export async function getUser(req: Request, res: Response) {
    try {
        const user = await User.findById(req.params.id)
        if (!user) return res.status(404).json({ ok: false, error: 'user not foud' })
        res.json({ ok: true, user })
    } catch (error) {
        res.status(500).json({ ok: false, error })
    }
}

export async function getUsers(req: Request, res: Response) {
    try {
        const users = await User.find()
        res.json({ ok: true, users })
    } catch (error) {
        res.status(500).json({ ok: false, error })
    }
}


export async function getUserByEmail(req: Request, res: Response) {
    try {
        const user = await User.findOne({ email: req.params.email })
        if (!user) return res.status(404).json({ ok: false, error: 'user not foud' })
        res.json({ ok: true, user })
    } catch (error) {
        res.status(500).json({ ok: false, error })
    }
}

export async function editUser(req: Request, res: Response) {
    try {
        const user = await User.findById(req.params.id)
        if (!user) return res.status(404).json({ ok: false, error: 'user not foud' })
        user.update(req.body, { new: true })
        await user.save()
        res.json({ ok: true, user })
    } catch (error) {
        res.status(500).json({ ok: false, error })
    }
}