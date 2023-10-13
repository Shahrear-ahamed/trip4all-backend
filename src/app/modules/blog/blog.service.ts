// Your service code here

import { Blog, Prisma } from '@prisma/client'
import prisma from '../../../shared/prisma'
import { IPaginationOptions } from '../../../interfaces/pagination'
import { IBlogFilterableFields } from './blog.interfaces'
import { blogSearchableFields } from './blog.constants'
import { paginationHelpers } from '../../../utils/paginationHelper'
import { IGenericResponse } from '../../../interfaces/common'

// create a new blog
const createBlog = async (profileId: string, payload: Blog): Promise<Blog> => {
  const result = await prisma.blog.create({
    data: {
      profileId,
      title: payload.title,
      body: payload.body,
      thumbnail: payload.thumbnail,
    },
  })

  // return after creation
  return result
}

// get a blog
const getABlog = async (id: string): Promise<Blog | null> => {
  const result = await prisma.blog.findUnique({
    where: {
      id,
    },
  })

  // return after find a blog
  return result
}

// all blogs
const getAllBlogs = async (
  filters: IBlogFilterableFields,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<Blog[]>> => {
  // extract searchTerm for implement search query from filters
  const { searchTerm, ...filtersData } = filters

  // extract pagination options
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions)

  // and conditions for search and filters
  const andConditions = []

  // search needs (OR) for searching in some specified fields
  if (searchTerm) {
    andConditions.push({
      OR: blogSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    })
  }

  // filter data for search in specified fields using (AND)
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

  // where condition for search and filters
  const whereConditions: Prisma.BlogWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {}

  // get all blog posts
  const result = await prisma.blog.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      sortBy && sortOrder
        ? {
            [sortBy]: sortOrder,
          }
        : { createdAt: 'desc' },
  })

  // total count blogs after search and filter or not
  const total = await prisma.blog.count({
    where: whereConditions,
  })

  const totalPage = Math.ceil(total / 10)

  // return after find all blogs with pagination
  return {
    meta: {
      limit,
      page,
      total,
      totalPage,
    },
    data: result,
  }
}

// update a blog
const updateBlog = async (
  id: string,
  payload: Partial<Blog>,
): Promise<Blog | null> => {
  const result = await prisma.blog.update({
    where: {
      id,
    },
    data: {
      title: payload.title,
      body: payload.body,
      thumbnail: payload.thumbnail,
    },
  })

  // return after update
  return result
}

// delete a blog
const deleteBlog = async (id: string): Promise<void> => {
  // fully delete a blog no return
  await prisma.blog.delete({
    where: {
      id,
    },
  })
}

export const BlogService = {
  createBlog,
  getABlog,
  getAllBlogs,
  updateBlog,
  deleteBlog,
}
