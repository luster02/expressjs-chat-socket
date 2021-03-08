import { config } from 'dotenv'
import { initDB } from './database'
import { Server } from './server'

(() => {
    config()
    initDB(() => {
        console.log('database is connected')
        Server((port: number) => {
            console.log(`server on port ${port}`)
        })
    })
})()