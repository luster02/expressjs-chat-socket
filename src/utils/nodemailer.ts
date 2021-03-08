import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
        user: process.env["MAIL_USER"],
        pass: process.env["MAIL_PASSWORD"]
    }
});