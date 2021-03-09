import jwt from 'jsonwebtoken'

export function verifyJwt(token: string) {
    try {
        const { uid } = (jwt.verify(token, String(process.env["JWT_KEY"])) as any)
        return [true, uid];

    } catch (error) {
        return [false, null];
    }
}