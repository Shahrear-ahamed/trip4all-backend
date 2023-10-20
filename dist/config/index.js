'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const dotenv_1 = __importDefault(require('dotenv'))
const path_1 = __importDefault(require('path'))
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), '.env') })
exports.default = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  saltRound: process.env.SALT_ROUND,
  jwt: {
    secret: process.env.JWT_ACCESS_SECRET,
    expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
    refresh_token_secret: process.env.JWT_REFRESH_SECRET,
    refresh_token_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
    reset_password_expires_in: process.env.JWT_RESET_TOKEN_EXPIRES_IN,
  },
}
