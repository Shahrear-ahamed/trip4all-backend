// Define your validations here

import { z } from 'zod'

// create tag zod schema validation
const createTagZodSchema = z.object({
  body: z.object({
    name: z.string().min(3),
  }),
})

// update tag zod schema validation
const updateTagZodSchema = z.object({
  body: z.object({
    name: z.string().min(3),
  }),
})

export const TagValidation = {
  createTagZodSchema,
  updateTagZodSchema,
}
