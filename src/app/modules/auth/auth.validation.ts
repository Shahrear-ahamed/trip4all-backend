// Define your validations here
import z from 'zod'

// sign up validation
const signUpValidation = z.object({
  body: z.object({
    email: z.string({ required_error: 'email must be required' }).email(),
    password: z
      .string({ required_error: 'password must be required' })
      .min(6, { message: 'password must be greater then 6 character' })
      .max(24, { message: 'password must be less then 24 character' }),
  }),
})

// sign ip validation
const signInValidation = z.object({
  body: z.object({
    email: z.string({ required_error: 'email must be required' }).email(),
    password: z
      .string({ required_error: 'password must be required' })
      .min(6, { message: 'password must be greater then 6 character' })
      .max(24, { message: 'password must be less then 24 character' }),
  }),
})

export const AuthValidation = {
  signUpValidation,
  signInValidation,
}
