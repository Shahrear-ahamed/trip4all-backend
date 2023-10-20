'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.AuthValidation = void 0
// Define your validations here
const zod_1 = __importDefault(require('zod'))
const auth_constants_1 = require('./auth.constants')
// sign up validation
const signUpZodSchema = zod_1.default.object({
  body: zod_1.default.object({
    email: zod_1.default
      .string({ required_error: 'email must be required' })
      .email(),
    role: zod_1.default.enum([...auth_constants_1.userRoles], {
      required_error: 'role must be required',
    }),
    password: zod_1.default
      .string({ required_error: 'password must be required' })
      .min(6, { message: 'password must be greater then 6 character' })
      .max(24, { message: 'password must be less then 24 character' }),
  }),
})
// sign ip validation
const signInZodSchema = zod_1.default.object({
  body: zod_1.default.object({
    email: zod_1.default
      .string({ required_error: 'email must be required' })
      .email(),
    password: zod_1.default
      .string({ required_error: 'password must be required' })
      .min(6, { message: 'password must be greater then 6 character' })
      .max(24, { message: 'password must be less then 24 character' }),
  }),
})
// refresh token validation
const refreshTokenZodSchema = zod_1.default.object({
  cookies: zod_1.default.object({
    refreshToken: zod_1.default.string({
      required_error: 'Refresh Token is required',
    }),
  }),
})
const changePasswordZodSchema = zod_1.default.object({
  body: zod_1.default.object({
    oldPassword: zod_1.default.string({
      required_error: 'Old password  is required',
    }),
    newPassword: zod_1.default.string({
      required_error: 'New password  is required',
    }),
  }),
})
exports.AuthValidation = {
  signUpZodSchema,
  signInZodSchema,
  refreshTokenZodSchema,
  changePasswordZodSchema,
}
