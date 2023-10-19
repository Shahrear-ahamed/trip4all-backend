// Your service code here

import { Category } from '@prisma/client'
import prisma from '../../../shared/prisma'

const createCategory = async (body: Category): Promise<Category> => {
  // Your code here

  const category = await prisma.category.create({
    data: body,
  })

  return category
}

const getAllCategories = async () => {
  // Your code here

  const categories = await prisma.category.findMany()

  return categories
}

const getCategoryById = async (id: string) => {
  // Your code here

  const category = await prisma.category.findUnique({
    where: {
      id,
    },
  })

  return category
}

const updateCategory = async (id: string, body: Category) => {
  // Your code here

  const category = await prisma.category.update({
    where: {
      id,
    },
    data: body,
  })

  return category
}

const deleteCategory = async (id: string) => {
  // Your code here

  const category = await prisma.category.delete({
    where: {
      id,
    },
  })

  return category
}

export const CategoryService = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
}
