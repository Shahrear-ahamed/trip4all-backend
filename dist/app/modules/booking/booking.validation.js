'use strict'
// Define your validations here
Object.defineProperty(exports, '__esModule', { value: true })
exports.BookingValidation = void 0
const zod_1 = require('zod')
const booking_constants_1 = require('./booking.constants')
const createBookingZodSchema = zod_1.z.object({
  body: zod_1.z.object({
    serviceId: zod_1.z.string().uuid({
      message: 'Invalid service id',
    }),
  }),
})
const updateCategoryZodSchema = zod_1.z.object({
  body: zod_1.z.object({
    status: zod_1.z.enum([...booking_constants_1.bookingStatus], {
      required_error: 'Status is required',
    }),
  }),
})
exports.BookingValidation = {
  createBookingZodSchema,
  updateCategoryZodSchema,
}
