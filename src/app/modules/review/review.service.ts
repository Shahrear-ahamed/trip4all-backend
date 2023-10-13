// Your service code here

import { Review } from '@prisma/client'
import prisma from '../../../shared/prisma'
import { IGenericResponse } from '../../../interfaces/common'
import { IPaginationOptions } from '../../../interfaces/pagination'
import { paginationHelpers } from '../../../utils/paginationHelper'

// create a new review
const createReview = async (id: string, payload: Review): Promise<Review> => {
  const result = await prisma.review.create({
    data: {
      profileId: id,
      serviceId: payload.serviceId,
      comment: payload.comment,
      rating: payload.rating,
    },
  })

  return result
}

// create a new review
const getAllReviews = async (
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<Review[]>> => {
  // pagination options extraction
  const { page, limit, skip } =
    paginationHelpers.calculatePagination(paginationOptions)

  // get the search query
  const result = await prisma.review.findMany({
    skip,
    take: limit,
    where: {},
    orderBy: {
      createdAt: 'desc',
    },
  })

  // total reviews
  const total = await prisma.review.count({
    where: {},
  })

  const totalPage = Math.ceil(total / limit)

  // return the result
  return {
    meta: {
      total,
      page,
      limit,
      totalPage,
    },
    data: result,
  }
}

// create a new review
const getAReview = async (id: string): Promise<Review | null> => {
  const result = await prisma.review.findUnique({
    where: {
      id,
    },
  })

  return result
}

// update a review
const updateReview = async (
  id: string,
  payload: Partial<Review>,
): Promise<Review> => {
  const result = await prisma.review.update({
    where: {
      id,
    },
    data: {
      serviceId: payload.serviceId,
      comment: payload.comment,
      rating: payload.rating,
    },
  })

  return result
}

// delete a review
const deleteReview = async (id: string): Promise<void> => {
  await prisma.review.delete({
    where: {
      id,
    },
  })
}

export const ReviewService = {
  createReview,
  getAllReviews,
  getAReview,
  updateReview,
  deleteReview,
}
