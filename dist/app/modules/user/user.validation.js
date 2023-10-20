'use strict'
// Define your validations here
Object.defineProperty(exports, '__esModule', { value: true })
exports.ProfileValidation = void 0
const zod_1 = require('zod')
const user_constants_1 = require('./user.constants')
const updateProfileZodSchema = zod_1.z.object({
  body: zod_1.z.object({
    firstName: zod_1.z.string().min(2).max(255).optional(),
    lastName: zod_1.z.string().min(2).max(255).optional(),
    bio: zod_1.z.string().min(2).max(255).optional(),
    avatar: zod_1.z.string().url().optional(),
    contactNo: zod_1.z.string().optional(),
    gender: zod_1.z
      .enum([...user_constants_1.gender], {
        errorMap: (issue, ctx) => {
          const issues = issue
          const options = issues.options.join(', ')
          return {
            message: `Invalid gender received: ${
              ctx === null || ctx === void 0 ? void 0 : ctx.data
            } instance of ${options}`,
          }
        },
      })
      .optional(),
    bloodGroup: zod_1.z.string().min(2).max(255).optional(),
    isVerified: zod_1.z.boolean().optional(),
  }),
})
exports.ProfileValidation = {
  updateProfileZodSchema,
}
