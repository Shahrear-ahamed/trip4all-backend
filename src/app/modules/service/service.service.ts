// Your service code here

import { Service, ServiceStatus } from '@prisma/client'
import prisma from '../../../shared/prisma'
import { IPaginationOptions } from '../../../interfaces/pagination'
import { paginationHelpers } from '../../../utils/paginationHelper'
import { IGenericResponse } from '../../../interfaces/common'

const createService = async (body: Service) => {
  const result = await prisma.service.create({
    data: body,
  })

  return result
}

const getServiceById = async (id: string) => {
  const result = await prisma.service.findUnique({
    where: {
      id,
    },
    include: {
      category: {
        select: {
          name: true,
        },
      },
    },
  })

  return result
}

const getAllServices = async (
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<Service[]>> => {
  // extract pagination options
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions)

  const result = await prisma.service.findMany({
    include: {
      category: {
        select: {
          name: true,
        },
      },
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
  // get total count of faqs by search and filters
  const total = await prisma.faq.count({})

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

const updateService = async (
  id: string,
  body: Service,
): Promise<Service | null> => {
  const result = await prisma.service.update({
    where: {
      id,
    },
    data: body,
  })

  return result
}

const deleteService = async (id: string) => {
  return await prisma.service.delete({
    where: {
      id,
    },
  })
}

const homeService = async () => {
  const categories = await prisma.category.findMany({
    take: 4,
    orderBy: {
      createdAt: 'desc',
    },
  })

  // give me single services of each category
  const result = await Promise.all(
    categories.map(async category => {
      const service = await prisma.service.findFirst({
        where: {
          categoryId: category.id,
        },
        select: {
          id: true,
          title: true,
          description: true,
          price: true,
          availableDate: true,
          slots: true,
          thumbnail: true,
          status: true,
        },
      })

      return {
        catId: category.id,
        catName: category.name,
        service,
      }
    }),
  )

  return result
}

// service by status
const getServiceByStatus = async (status: ServiceStatus) => {
  const result = await prisma.service.findMany({
    take: 3,
    where: {
      status,
    },
    include: {
      category: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return result
}

export const ServiceService = {
  createService,
  updateService,
  deleteService,
  getServiceById,
  getAllServices,
  homeService,
  getServiceByStatus,
}
