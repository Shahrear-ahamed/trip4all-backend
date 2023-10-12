import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { UserService } from './user.service'
// Your controller code here

const getMyProfile = catchAsync(async (req, res) => {
  const user = req.user
  const result = await UserService.getMyProfile(user?.id as string)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'My profile retrieved successfully',
    data: result,
  })
})

export const UserController = { getMyProfile }
