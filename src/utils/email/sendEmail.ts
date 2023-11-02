import nodemailer, { TransportOptions } from 'nodemailer'
import config from '../../config'

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  host: config.email.host || 'localhost',
  port: Number(config.email.port),
  secure: config.email.secure === 'true', // true for 465, false for other ports
  auth: {
    user: config.email.user,
    pass: config.email.pass,
  },
} as TransportOptions)

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string
  subject: string
  html: string
}) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: 'dev.shahrear@gmail.com', // sender address
    to,
    subject, // Subject line
    html, // html body
  })

  return info
}
