import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import prisma from '../../../shared/prisma'

// Your service code here
const getMyProfile = async (id: string) => {
  const result = await prisma.profile.findUnique({
    where: {
      id,
    },
  })

  // if result or user not found throw error
  if (!result) throw new ApiError(httpStatus.NOT_FOUND, 'User not found')

  return result
}

export const UserService = { getMyProfile }
