import express from 'express'
import { TagController } from './tag.controller'
import auth from '../../middlewares/auth'
import { ENUM_USER_ROLE } from '../../../enum/userRole'
import validateRequest from '../../middlewares/validateRequest'
import { TagValidation } from './tag.validation'

// Define your routes here
const router = express.Router()

// create tag
router.post(
  '/',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(TagValidation.createTagZodSchema),
  TagController.createTag,
)

// get all tags
router.get('/', TagController.getAllTags)

// get single tag
router.get('/:id', TagController.getATag)

// update tag
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(TagValidation.updateTagZodSchema),
  TagController.updateTag,
)

// delete tag
router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), TagController.deleteTag)

export const TagRoutes = router
