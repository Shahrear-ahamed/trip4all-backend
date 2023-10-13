// Define your validations here

import { z } from 'zod'

// create blog zod schema validation
const createBlogZodSchema = z.object({
  body: z.object({
    title: z.string().max(255),
    body: z.string(),
    thumbnail: z.string().url().optional(),
  }),
})

// update blog zod schema validation
const updateBlogZodSchema = z.object({
  body: z.object({
    title: z.string().max(255).optional(),
    body: z.string().optional(),
    thumbnail: z.string().url().optional(),
  }),
})

export const BlogValidation = {
  createBlogZodSchema,
  updateBlogZodSchema,
}
