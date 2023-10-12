import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import prisma from '../../../shared/prisma'
import { Profile } from '@prisma/client'

// Your service code here
const getMyProfile = async (id: string): Promise<Profile> => {
  const result = await prisma.profile.findUnique({
    where: {
      id,
    },
  })

  // if result or user not found throw error
  if (!result) throw new ApiError(httpStatus.NOT_FOUND, 'User not found')

  return result
}

// Your service code here
const updateMyProfile = async (
  id: string,
  payload: Partial<Profile>,
): Promise<Profile> => {
  const profile = await prisma.profile.findUnique({
    where: {
      id,
    },
  })

  // if profile or user not found throw error
  if (!profile) throw new ApiError(httpStatus.NOT_FOUND, 'User not found')

  const result = await prisma.profile.update({
    where: {
      id,
    },
    data: payload,
  })

  return result
}

export const UserService = { getMyProfile, updateMyProfile }
