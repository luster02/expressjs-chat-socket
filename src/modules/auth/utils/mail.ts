import { transporter } from '../../../utils/nodemailer'

export function sendMailResetPasswordUtils(data: { email: string, code: number }) {
    return transporter.sendMail({
        from: `No-reply reset-password`,
        to: data.email,
        subject: "reset-password",
        html: `
            <p> Your code for reset password  is  <b>${data.code}</b></p>
        `,
    });
}