// Define your validations here

import { z } from 'zod'
import { bookingStatus } from './booking.constants'

const createBookingZodSchema = z.object({
  body: z.object({
    serviceId: z.string().uuid({
      message: 'Invalid service id',
    }),
  }),
})

const updateCategoryZodSchema = z.object({
  body: z.object({
    status: z.enum([...bookingStatus] as [string, ...string[]], {
      required_error: 'Status is required',
    }),
  }),
})

export const BookingValidation = {
  createBookingZodSchema,
  updateCategoryZodSchema,
}
