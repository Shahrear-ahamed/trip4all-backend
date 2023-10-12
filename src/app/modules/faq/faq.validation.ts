import { z } from 'zod'

// Define your validations here
const createFaqZodSchema = z.object({
  body: z.object({
    title: z.string().min(10).max(120),
    body: z.string().min(10).max(255),
  }),
})

const updateFaqZodSchema = z.object({
  body: z.object({
    title: z.string().min(10).max(120).optional(),
    body: z.string().min(10).max(255).optional(),
  }),
})

export const FaqValidation = {
  createFaqZodSchema,
  updateFaqZodSchema,
}
