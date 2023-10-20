'use strict'
// Define your validations here
Object.defineProperty(exports, '__esModule', { value: true })
exports.ReviewValidation = void 0
const zod_1 = require('zod')
// create review zod schema validation
const createReviewZodSchema = zod_1.z.object({
  body: zod_1.z.object({
    serviceId: zod_1.z.string().uuid(),
    rating: zod_1.z.number().min(1).max(5),
    comment: zod_1.z.string().min(4).max(255),
  }),
})
// update review zod schema validation
const updateReviewZodSchema = zod_1.z.object({
  body: zod_1.z.object({
    rating: zod_1.z.number().min(1).max(5).optional(),
    comment: zod_1.z.string().min(4).max(255).optional(),
  }),
})
exports.ReviewValidation = {
  createReviewZodSchema,
  updateReviewZodSchema,
}
