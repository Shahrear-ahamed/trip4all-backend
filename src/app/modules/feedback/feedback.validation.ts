import { z } from 'zod'

// Define your validations here
const createFeedbackZodSchema = z.object({
  body: z.object({
    profileId: z.string().max(255),
    comment: z.string().max(255),
  }),
})

export const FeedbackValidation = {
  createFeedbackZodSchema,
}
