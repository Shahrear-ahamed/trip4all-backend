// Your service code here

import { Tag } from '@prisma/client'
import prisma from '../../../shared/prisma'
import { IGenericResponse } from '../../../interfaces/common'
import { IPaginationOptions } from '../../../interfaces/pagination'
import { paginationHelpers } from '../../../utils/paginationHelper'

const createTag = async (tag: Tag): Promise<Tag> => {
  const result = await prisma.tag.create({
    data: {
      name: tag.name,
    },
  })

  return result
}

const getAllTags = async (
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<Tag[]>> => {
  // pagination options extraction
  const { page, limit, skip } =
    paginationHelpers.calculatePagination(paginationOptions)

  // get the search query
  const result = await prisma.tag.findMany({
    skip,
    take: limit,
    where: {},
    orderBy: {
      createdAt: 'desc',
    },
  })

  // total tags
  const total = await prisma.tag.count({
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

const getATag = async (id: string): Promise<Tag | null> => {
  const result = await prisma.tag.findUnique({
    where: {
      id,
    },
  })

  return result
}

const updateTag = async (id: string, tag: Tag): Promise<Tag> => {
  const result = await prisma.tag.update({
    where: {
      id,
    },
    data: {
      name: tag.name,
    },
  })

  return result
}

const deleteTag = async (id: string): Promise<void> => {
  await prisma.tag.delete({
    where: {
      id,
    },
  })
}

export const TagService = {
  createTag,
  getAllTags,
  getATag,
  updateTag,
  deleteTag,
}
