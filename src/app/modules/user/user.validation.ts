// Define your validations here

import { ZodInvalidEnumValueIssue, z } from 'zod'
import { gender } from './user.constants'

const updateProfileZodSchema = z.object({
  body: z.object({
    firstName: z.string().min(2).max(255).optional(),
    lastName: z.string().min(2).max(255).optional(),
    bio: z.string().min(2).max(255).optional(),
    avatar: z.string().url().optional(),
    contactNo: z.string().optional(),
    gender: z
      .enum([...gender] as [string, ...string[]], {
        errorMap: (issue, ctx) => {
          const issues = issue as ZodInvalidEnumValueIssue
          const options = issues.options.join(', ')
          return {
            message: `Invalid gender received: ${ctx?.data} instance of ${options}`,
          }
        },
      })
      .optional(),
    bloodGroup: z.string().min(2).max(255).optional(),
    isVerified: z.boolean().optional(),
  }),
})

export const ProfileValidation = {
  updateProfileZodSchema,
}
