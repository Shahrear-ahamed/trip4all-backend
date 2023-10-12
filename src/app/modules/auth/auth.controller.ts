import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import { AuthService } from './auth.service'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import { Cookie } from '../../../shared/setCookie'

// Your controller code here

// sign up user controller
const signUp = catchAsync(async (req: Request, res: Response) => {
  const body = req.body
  const { refreshToken, ...result } = await AuthService.signUp(body)

  // set refresh token to cookie
  Cookie.setCookie(res, refreshToken, 7)

  // send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Register successfully',
    data: result,
  })
})

// sign in user controller
const signIn = catchAsync(async (req: Request, res: Response) => {
  const body = req.body
  const { refreshToken, ...result } = await AuthService.signIn(body)

  // set refresh token to cookie
  Cookie.setCookie(res, refreshToken, 7)

  // send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Login successfully',
    data: result,
  })
})

export const AuthController = {
  signUp,
  signIn,
}
