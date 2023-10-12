// Your service code here
import { DateTime } from 'luxon'
import { Feedback, Prisma } from '@prisma/client'
import prisma from '../../../shared/prisma'
import { IGenericResponse } from '../../../interfaces/common'
import { IPaginationOptions } from '../../../interfaces/pagination'
import { paginationHelpers } from '../../../utils/paginationHelper'
import { IDateRange } from './feedback.interfaces'

// create a new feedback
const createFeedback = async (payload: Feedback): Promise<Feedback> => {
  const result = await prisma.feedback.create({
    data: payload,
  })

  return result
}

// get all feedbacks
const getAllFeedbacks = async (
  paginationOptions: IPaginationOptions,
  dateRange?: IDateRange,
): Promise<IGenericResponse<Feedback[]>> => {
  // extract pagination options
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions)

  // Initialize where condition
  let whereCondition: Prisma.FeedbackWhereInput = {}

  // Apply date range filter if provided
  if (dateRange && dateRange.startDate && dateRange.endDate) {
    whereCondition = {
      ...whereCondition,
      createdAt: {
        gte: DateTime.fromJSDate(dateRange.startDate).startOf('day').toISO()!,
        lte: DateTime.fromJSDate(dateRange.endDate).endOf('day').toISO()!,
      },
    }
  }

  const result = await prisma.feedback.findMany({
    where: whereCondition,
    skip,
    take: limit,
    orderBy:
      sortBy && sortOrder
        ? { [sortBy]: sortOrder }
        : {
            createdAt: 'desc',
          },
  })

  // get total count of faqs by search and filters
  const total = await prisma.feedback.count({ where: whereCondition })

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

// get single feedback
const getFeedback = async (id: string): Promise<Feedback | null> => {
  const result = await prisma.feedback.findUnique({
    where: { id },
  })

  return result
}

// delete feedback
const deleteFeedback = async (id: string): Promise<void> => {
  await prisma.feedback.delete({
    where: { id },
  })
}

export const FeedbackService = {
  createFeedback,
  getFeedback,
  getAllFeedbacks,
  deleteFeedback,
}
