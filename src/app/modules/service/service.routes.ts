import express from 'express'
import { ServiceController } from './service.controller'
import auth from '../../middlewares/auth'
import { ENUM_USER_ROLE } from '../../../enum/userRole'
import validateRequest from '../../middlewares/validateRequest'
import { ServiceValidation } from './service.validation'

// Define your routes here
const router = express.Router()

// get home service
router.get('/home', ServiceController.homeService)

// get service by status
router.get('/home/:status', ServiceController.getServiceByStatus)

// create a new service
router.post(
  '/',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(ServiceValidation.createServiceZodSchema),
  ServiceController.createService,
)

// update a service
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(ServiceValidation.updateServiceZodSchema),
  ServiceController.updateService,
)

// delete a service
router.delete('/:id', ServiceController.deleteService)

// get all services
router.get('/', ServiceController.getAllServices)

// get a service by id
router.get('/:id', ServiceController.getServiceById)

export const ServiceRoutes = router
