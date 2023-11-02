import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env') })

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  saltRound: process.env.SALT_ROUND,
  frontend: process.env.FRONTEND_URL,
  jwt: {
    secret: process.env.JWT_ACCESS_SECRET,
    expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
    refresh_token_secret: process.env.JWT_REFRESH_SECRET,
    refresh_token_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
    reset_password_expires_in: process.env.JWT_RESET_TOKEN_EXPIRES_IN,
  },
  email: {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE,
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
}
