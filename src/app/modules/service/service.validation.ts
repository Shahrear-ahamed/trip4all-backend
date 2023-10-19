// Define your validations here
import { z } from 'zod'
import { serviceStatus } from './service.constants'

const createServiceZodSchema = z.object({
  body: z.object({
    title: z.string().min(1).max(255),
    description: z.string().min(1).max(1000),
    price: z.number().positive(),
    availableDate: z.string(),
    slots: z.number().int().positive(),
    thumbnail: z.string().optional(),
    categoryId: z.string().uuid(),
    status: z.enum([...serviceStatus] as [string, ...string[]], {
      required_error: 'status must be required',
    }),
  }),
})

const updateServiceZodSchema = z.object({
  body: z.object({
    title: z.string().min(1).max(255).optional(),
    description: z.string().min(1).max(1000).optional(),
    price: z.number().positive().optional(),
    availableDate: z.date().optional(),
    slots: z.number().int().positive().optional(),
    thumbnail: z.string().optional(),
    categoryId: z.string().uuid().optional(),
    status: z
      .enum([...serviceStatus] as [string, ...string[]], {
        required_error: 'status must be required',
      })
      .optional(),
  }),
})

export const ServiceValidation = {
  createServiceZodSchema,
  updateServiceZodSchema,
}
