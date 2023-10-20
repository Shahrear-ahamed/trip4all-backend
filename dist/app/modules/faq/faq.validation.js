'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.FaqValidation = void 0
const zod_1 = require('zod')
// Define your validations here
const createFaqZodSchema = zod_1.z.object({
  body: zod_1.z.object({
    title: zod_1.z.string().min(10).max(120),
    body: zod_1.z.string().min(10).max(255),
  }),
})
const updateFaqZodSchema = zod_1.z.object({
  body: zod_1.z.object({
    title: zod_1.z.string().min(10).max(120).optional(),
    body: zod_1.z.string().min(10).max(255).optional(),
  }),
})
exports.FaqValidation = {
  createFaqZodSchema,
  updateFaqZodSchema,
}
