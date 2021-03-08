import { NextFunction, Response } from 'express'
import jwt from 'jsonwebtoken'

export function ValidateJsonWenToken(req: any, res: Response, next: NextFunction) {
    const token = req.header('authorization')
    if (!token) return res.status(401).json({ ok: false, error: 'authorization is required' })

    try {
        const verifiedToken: any = jwt.verify(token, String(process.env["JWT_KEY"]))
        req.uid = verifiedToken.uid
        next()
    } catch (error) {
        return res.status(401).json({ ok: false, error: 'invalid authorization token' })
    }
}