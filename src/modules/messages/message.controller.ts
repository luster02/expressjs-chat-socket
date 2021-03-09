import { Request, Response } from 'express'
import { Message } from './message.model'

export async function CreateRestMessage(req: Request, res: Response) {
    try {
        const message = await Message.create(req.body)
        res.status(201).json({ ok: true, message })
    } catch (error) {
        res.status(500).json({ ok: false, error })
    }
}

export async function GetMessages(req: any, res: Response) {
    try {
        const meesages = await Message.find({
            $or: [{ from: req.uid }, { to: req.uid }]
        }).sort({ createdAt: 'desc' })
        res.json({ ok: true, meesages })
    } catch (error) {
        res.status(500).json({ ok: false, error })
    }
}

export async function CreateIoMessage(payload: any) {
    try {
        const message = new Message(payload)
        await message.save()
        return true
    } catch (error) {
        return false
    }
}