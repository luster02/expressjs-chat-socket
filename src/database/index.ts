import { connect } from 'mongoose'

export async function initDB(callback: any) {
    try {
        await connect(String(process.env["MONGO_URI"]), {
            useNewUrlParser: true,
            useFindAndModify: true, 
            useUnifiedTopology: true,
        })
        callback()
    } catch (error) {
        throw new Error(error)
        process.exit(0)
    }
}