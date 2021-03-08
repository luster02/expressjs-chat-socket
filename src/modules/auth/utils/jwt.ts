import jwt from 'jsonwebtoken'

export function GenerateJsonWenToken(payload: { uid: string, email: string }): Promise<string> {
    return new Promise((resolve, reject) => {

        jwt.sign(payload, String(process.env["JWT_KEY"]), {
            expiresIn: '1h'
        }, (err, encoded: any) => {
            if (err) {
                reject(err)
            } else {
                resolve(encoded)
            }
        })
    })
}

