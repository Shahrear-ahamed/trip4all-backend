import { User } from '.prisma/client'
import prisma from '../../../shared/prisma'
import ApiError from '../../../errors/ApiError'
import httpStatus from 'http-status'
import { BcryptPassword } from '../../../utils/bcryptPass'
import { TokenServices } from '../../../utils/token'
import { IChangePassword, IReturnToken } from './auth.interfaces'
import config from '../../../config'

// Your service code here
const signUp = async (payload: User) => {
  const { email, role, password } = payload
  const hashPass = await BcryptPassword.hashedPassword(password)

  // use transaction to create user, profile and cart table
  const result = await prisma.$transaction(
    async (createAccountTrans): Promise<User> => {
      // create profile
      const profile = await createAccountTrans.profile.create({
        data: {
          email,
        },
      })

      // check profile created or not
      if (!profile)
        throw new ApiError(
          httpStatus.UNPROCESSABLE_ENTITY,
          'Unable to create profile',
        )

      // create cart table for each user to book any service
      await createAccountTrans.cart.create({
        data: {
          profileId: profile.id,
        },
      })

      // create user with user profileId
      const user = await createAccountTrans.user.create({
        data: {
          email,
          password: hashPass,
          role,
          profileId: profile.id,
        },
      })

      // return user only
      return user
    },
  )

  // if result is null, throw error
  if (!result)
    throw new ApiError(
      httpStatus.UNPROCESSABLE_ENTITY,
      'Unable to create profile',
    )

  const returnResult = {
    id: result.id,
    email: result.email,
    role: result.role,
    profileId: result.profileId,
    createdAt: result.createdAt,
    updatedAt: result.updatedAt,
  }

  // return user
  return returnResult
}

// login with email and password
const signIn = async (payload: Partial<User>): Promise<IReturnToken> => {
  const { email, password } = payload

  // find user by email
  const result = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  // if result is null, throw error ()
  if (!result)
    throw new ApiError(httpStatus.NOT_FOUND, 'Password or email is incorrect')

  // now check password
  const isMatch = await BcryptPassword.comparePassword(
    password!,
    result.password,
  )

  // if password is not match, throw error
  if (!isMatch)
    throw new ApiError(httpStatus.NOT_FOUND, 'Password or email is incorrect')

  // create token for user
  const tokenPayload = {
    id: result.profileId,
    email: result.email,
    role: result.role,
  }

  const accessToken = await TokenServices.generateToken(tokenPayload)
  const refreshToken = await TokenServices.generateRefreshToken(tokenPayload)

  // return access token and refresh token for direct login after sign up
  return {
    accessToken,
    refreshToken,
  }
}

// get access token from refresh token
const getAccessToken = async (
  token: string,
): Promise<Partial<IReturnToken>> => {
  // verify refresh token
  const result = await TokenServices.verifyToken(
    token,
    config.jwt.refresh_token_secret as string,
  )

  // if result is null, throw error
  if (!result) throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized')

  // find user by profileId for check user exist or not
  const user = await prisma.profile.findUnique({
    where: {
      id: result.id,
    },
  })

  // if user is null, throw error
  if (!user) throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized')

  // create token for user
  const tokenPayload = {
    id: result.id,
    email: result.email,
    role: result.role,
  }

  const accessToken = await TokenServices.generateToken(tokenPayload)

  // return access token
  return { accessToken }
}

// change password of user, if user is logged in
const changePassword = async (
  profileId: string,
  payload: IChangePassword,
): Promise<void> => {
  const { oldPassword, newPassword } = payload

  // find user by profileId for user existence
  const user = await prisma.user.findUnique({
    where: {
      profileId,
    },
  })

  // if user is null, throw error
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found')

  // check old password is correct or not
  const isMatch = await BcryptPassword.comparePassword(
    oldPassword,
    user.password,
  )

  // if password is not match, throw error
  if (!isMatch)
    throw new ApiError(httpStatus.NOT_FOUND, 'Your old password is incorrect')

  // hash new password
  const hashPass = await BcryptPassword.hashedPassword(newPassword)

  // update password
  const result = await prisma.user.update({
    where: {
      profileId,
    },
    data: {
      password: hashPass,
    },
  })

  // is anything wrong, throw error
  if (!result)
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Something went wrong')
}

export const AuthService = {
  signUp,
  signIn,
  getAccessToken,
  changePassword,
}
