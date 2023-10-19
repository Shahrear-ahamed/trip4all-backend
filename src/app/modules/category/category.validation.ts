// Define your validations here

import { z } from 'zod'

const createCategoryZodSchema = z.object({
  body: z.object({
    name: z.string().min(3).max(255),
  }),
})

const updateCategoryZodSchema = z.object({
  body: z.object({
    name: z.string().min(3).max(255).optional(),
  }),
})

export const CategoryValidation = {
  createCategoryZodSchema,
  updateCategoryZodSchema,
}
