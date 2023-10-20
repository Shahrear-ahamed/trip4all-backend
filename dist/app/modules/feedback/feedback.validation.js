'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.FeedbackValidation = void 0
const zod_1 = require('zod')
// Define your validations here
const createFeedbackZodSchema = zod_1.z.object({
  body: zod_1.z.object({
    profileId: zod_1.z.string().max(255),
    comment: zod_1.z.string().max(255),
  }),
})
exports.FeedbackValidation = {
  createFeedbackZodSchema,
}
