// Your service code here

import { Booking, Status } from '@prisma/client'
import prisma from '../../../shared/prisma'
import ApiError from '../../../errors/ApiError'
import httpStatus from 'http-status'
import { paginationHelpers } from '../../../utils/paginationHelper'
import { IPaginationOptions } from '../../../interfaces/pagination'
import { IGenericResponse } from '../../../interfaces/common'

// create new booking
const createBooking = async (
  profileId: string,
  bookingData: Booking,
): Promise<Booking> => {
  const cartId = await prisma.cart.findUnique({
    where: {
      profileId,
    },
  })

  if (!cartId) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Cart not found')
  }

  const service = await prisma.service.findUnique({
    where: {
      id: bookingData.serviceId,
    },
  })

  if (!service) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Service not found')
  }

  const booking = await prisma.booking.create({
    data: {
      cartId: cartId.id,
      profileId,
      serviceId: bookingData.serviceId,
      date: service.availableDate,
    },
  })

  return booking
}

const updateBooking = async (
  bookingId: string,
  payload: Partial<Booking>,
): Promise<Booking> => {
  const booking = await prisma.booking.update({
    where: {
      id: bookingId,
    },
    data: {
      status: payload.status,
    },
  })

  return booking
}

// get all bookings by status
const getAllBookingsByStatus = async (
  status: Status,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<Booking[]>> => {
  // extract pagination options
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions)

  const result = await prisma.booking.findMany({
    where: {
      status,
    },
    skip,
    take: limit,
    orderBy:
      sortBy && sortOrder
        ? { [sortBy]: sortOrder }
        : {
            createdAt: 'desc',
          },
  })

  // get total count of faqs by pagination options
  const total = await prisma.booking.count({
    where: {
      status,
    },
  })

  const totalPage = Math.ceil(total / limit)

  return {
    meta: {
      page,
      limit,
      total,
      totalPage,
    },
    data: result,
  }
}

// get single booking by id
const getBookingById = async (bookingId: string): Promise<Booking | null> => {
  const booking = await prisma.booking.findUnique({
    where: {
      id: bookingId,
    },
  })

  return booking
}

const deleteBooking = async (bookingId: string): Promise<Booking> => {
  const booking = await prisma.booking.delete({
    where: {
      id: bookingId,
    },
  })

  return booking
}

export const BookingService = {
  createBooking,
  getAllBookingsByStatus,
  updateBooking,
  deleteBooking,
  getBookingById,
}
