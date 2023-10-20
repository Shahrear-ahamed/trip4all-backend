'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.TagRoutes = void 0
const express_1 = __importDefault(require('express'))
const tag_controller_1 = require('./tag.controller')
const auth_1 = __importDefault(require('../../middlewares/auth'))
const userRole_1 = require('../../../enum/userRole')
const validateRequest_1 = __importDefault(
  require('../../middlewares/validateRequest'),
)
const tag_validation_1 = require('./tag.validation')
// Define your routes here
const router = express_1.default.Router()
// create tag
router.post(
  '/',
  (0, auth_1.default)(userRole_1.ENUM_USER_ROLE.ADMIN),
  (0, validateRequest_1.default)(
    tag_validation_1.TagValidation.createTagZodSchema,
  ),
  tag_controller_1.TagController.createTag,
)
// get all tags
router.get('/', tag_controller_1.TagController.getAllTags)
// get single tag
router.get('/:id', tag_controller_1.TagController.getATag)
// update tag
router.patch(
  '/:id',
  (0, auth_1.default)(userRole_1.ENUM_USER_ROLE.ADMIN),
  (0, validateRequest_1.default)(
    tag_validation_1.TagValidation.updateTagZodSchema,
  ),
  tag_controller_1.TagController.updateTag,
)
// delete tag
router.delete(
  '/:id',
  (0, auth_1.default)(userRole_1.ENUM_USER_ROLE.ADMIN),
  tag_controller_1.TagController.deleteTag,
)
exports.TagRoutes = router
