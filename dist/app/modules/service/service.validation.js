'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.ServiceValidation = void 0
// Define your validations here
const zod_1 = require('zod')
const service_constants_1 = require('./service.constants')
const createServiceZodSchema = zod_1.z.object({
  body: zod_1.z.object({
    title: zod_1.z.string().min(1).max(255),
    description: zod_1.z.string().min(1).max(1000),
    price: zod_1.z.number().positive(),
    availableDate: zod_1.z.string(),
    slots: zod_1.z.number().int().positive(),
    thumbnail: zod_1.z.string().optional(),
    categoryId: zod_1.z.string().uuid(),
    status: zod_1.z.enum([...service_constants_1.serviceStatus], {
      required_error: 'status must be required',
    }),
  }),
})
const updateServiceZodSchema = zod_1.z.object({
  body: zod_1.z.object({
    title: zod_1.z.string().min(1).max(255).optional(),
    description: zod_1.z.string().min(1).max(1000).optional(),
    price: zod_1.z.number().positive().optional(),
    availableDate: zod_1.z.date().optional(),
    slots: zod_1.z.number().int().positive().optional(),
    thumbnail: zod_1.z.string().optional(),
    categoryId: zod_1.z.string().uuid().optional(),
    status: zod_1.z
      .enum([...service_constants_1.serviceStatus], {
        required_error: 'status must be required',
      })
      .optional(),
  }),
})
exports.ServiceValidation = {
  createServiceZodSchema,
  updateServiceZodSchema,
}
