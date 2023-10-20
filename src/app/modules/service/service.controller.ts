import httpStatus from 'http-status'
import sendResponse from '../../../shared/sendResponse'
import { ServiceService } from './service.service'
import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import { paginationFields } from '../../../constants/panigation'
import pick from '../../../shared/pick'
import { ServiceStatus } from '@prisma/client'

// Your controller code here
const createService = catchAsync(async (req: Request, res: Response) => {
  const body = req.body
  const result = await ServiceService.createService(body)

  // send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Create service successfully',
    data: result,
  })
})

const getServiceById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await ServiceService.getServiceById(id)

  // send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Retrieved service successfully',
    data: result,
  })
})

const getAllServices = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pick(req.query, paginationFields)
  const result = await ServiceService.getAllServices(paginationOptions)

  // send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Retrieved all service successfully',
    data: result,
  })
})

const updateService = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const body = req.body
  const result = await ServiceService.updateService(id, body)

  // send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Update service successfully',
    data: result,
  })
})

const deleteService = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await ServiceService.deleteService(id)

  // send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Delete service successfully',
    data: result,
  })
})

const homeService = catchAsync(async (req: Request, res: Response) => {
  const result = await ServiceService.homeService()

  // send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Retrieved home service successfully',
    data: result,
  })
})

// get service by status
const getServiceByStatus = catchAsync(async (req: Request, res: Response) => {
  const status = req.params.status
  const result = await ServiceService.getServiceByStatus(
    status as ServiceStatus,
  )

  // send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: `Retrieved ${status} service successfully`,
    data: result,
  })
})

export const ServiceController = {
  createService,
  updateService,
  deleteService,
  getServiceById,
  getAllServices,
  homeService,
  getServiceByStatus,
}
