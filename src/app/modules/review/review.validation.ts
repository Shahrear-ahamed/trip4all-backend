// Define your validations here

import { z } from 'zod'

// create review zod schema validation
const createReviewZodSchema = z.object({
  body: z.object({
    serviceId: z.string().uuid(),
    rating: z.number().min(1).max(5),
    comment: z.string().min(4).max(255),
  }),
})

// update review zod schema validation
const updateReviewZodSchema = z.object({
  body: z.object({
    rating: z.number().min(1).max(5).optional(),
    comment: z.string().min(4).max(255).optional(),
  }),
})

export const ReviewValidation = {
  createReviewZodSchema,
  updateReviewZodSchema,
}
