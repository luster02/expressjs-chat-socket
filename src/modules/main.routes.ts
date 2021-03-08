import { Router } from 'express'

export default function () {
    const router = Router()

    router.get('/', (req: any, res: any) => {
        res.json({
            ok: true,
            body: 'api works'
        })
    })

    return router
}