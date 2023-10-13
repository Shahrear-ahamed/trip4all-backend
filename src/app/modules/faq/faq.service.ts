// Your service code here

import { Faq, Prisma } from '@prisma/client'
import prisma from '../../../shared/prisma'
import ApiError from '../../../errors/ApiError'
import httpStatus from 'http-status'
import { IFaqFilters } from './faq.interfaces'
import { IPaginationOptions } from '../../../interfaces/pagination'
import { IGenericResponse } from '../../../interfaces/common'
import { paginationHelpers } from '../../../utils/paginationHelper'
import { faqSearchableFields } from './faq.constants'

// this routes for all user and public, because this will be shown in the frontend and home or faq page

// public faqs
const publicFaqs = async (limit: number): Promise<Faq[]> => {
  const result = await prisma.faq.findMany({
    where: { isActive: true },
    take: limit,
  })

  return result
}

// this routes for only super admin and admin because of using this routes they can find or update and delete

// create a new faq
const createFaq = async (payload: Faq): Promise<Faq> => {
  const result = await prisma.faq.create({
    data: payload,
  })

  return result
}

// get faqs
const getFaqs = async (
  filters: IFaqFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<Faq[]>> => {
  // extract searchTerm for implement search query from filters
  const { searchTerm, ...filtersData } = filters

  // extract pagination options
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions)

  // and conditions for search and filters
  const andConditions = []

  // search needs (OR) for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      OR: faqSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    })
  }

  // if user search with some properties
  if (Object.keys(filtersData).length) {
    andConditions.push({
      AND: Object.entries(filtersData).map(([field, value]) => ({
        [field]: {
          contains: value,
          mode: 'insensitive',
        },
      })),
    })
  }

  // where conditions for search and filters
  const whereConditions: Prisma.FaqWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {}

  // get  faqs by search and filters
  const result = await prisma.faq.findMany({
    where: whereConditions,
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
  const total = await prisma.faq.count({
    where: whereConditions,
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

// get single faq
const getSingleFaq = async (id: string): Promise<Faq | null> => {
  const result = await prisma.faq.findUnique({
    where: { id },
  })

  if (!result) throw new ApiError(httpStatus.NOT_FOUND, 'Faq not found')

  return result
}

// update faq
const updateFaq = async (id: string, payload: Faq): Promise<Faq> => {
  const result = await prisma.faq.update({
    where: { id },
    data: payload,
  })

  return result
}

// delete faq
const deleteFaq = async (id: string): Promise<void> => {
  await prisma.faq.delete({
    where: { id },
  })
}

export const FaqService = {
  publicFaqs,
  createFaq,
  getFaqs,
  getSingleFaq,
  updateFaq,
  deleteFaq,
}
