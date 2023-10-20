'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.Cookie = void 0
const config_1 = __importDefault(require('../config'))
const setCookie = (res, token, days) => {
  const options = {
    httpOnly: true,
    secure: config_1.default.env === 'production',
    maxAge: 1000 * 60 * 60 * 24 * days,
  }
  res.cookie('refreshToken', token, options)
}
exports.Cookie = {
  setCookie,
}
