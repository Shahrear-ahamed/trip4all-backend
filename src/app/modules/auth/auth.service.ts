import { User } from '.prisma/client'
import prisma from '../../../shared/prisma'
import ApiError from '../../../errors/ApiError'
import httpStatus from 'http-status'
import { BcryptPassword } from '../../../utils/bcryptPass'
import { TokenServices } from '../../../utils/token'
import { IReturnToken } from './auth.interfaces'

// Your service code here
const signUp = async (payload: User): Promise<IReturnToken> => {
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

export const AuthService = { signUp, signIn }
