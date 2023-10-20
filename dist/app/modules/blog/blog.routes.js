'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.BlogRoutes = void 0
const express_1 = __importDefault(require('express'))
const blog_controller_1 = require('./blog.controller')
const validateRequest_1 = __importDefault(
  require('../../middlewares/validateRequest'),
)
const blog_validation_1 = require('./blog.validation')
const auth_1 = __importDefault(require('../../middlewares/auth'))
const userRole_1 = require('../../../enum/userRole')
// Define your routes here
const router = express_1.default.Router()
// create a blog router
router.post(
  '/',
  (0, auth_1.default)(
    userRole_1.ENUM_USER_ROLE.SUPER_ADMIN,
    userRole_1.ENUM_USER_ROLE.ADMIN,
  ),
  (0, validateRequest_1.default)(
    blog_validation_1.BlogValidation.createBlogZodSchema,
  ),
  blog_controller_1.BlogController.createBlog,
)
// get all blogs router
router.get('/', blog_controller_1.BlogController.getAllBlogs)
//for read blog by slug
router.get('/:slug', blog_controller_1.BlogController.getBlogBySlug)
// get a blog router update this blog
router.get('/:id', blog_controller_1.BlogController.getABlog)
// update a blog router
router.patch(
  '/:id',
  (0, auth_1.default)(
    userRole_1.ENUM_USER_ROLE.SUPER_ADMIN,
    userRole_1.ENUM_USER_ROLE.ADMIN,
  ),
  (0, validateRequest_1.default)(
    blog_validation_1.BlogValidation.updateBlogZodSchema,
  ),
  blog_controller_1.BlogController.updateBlog,
)
// delete a blog router
router.delete(
  '/:id',
  (0, auth_1.default)(
    userRole_1.ENUM_USER_ROLE.SUPER_ADMIN,
    userRole_1.ENUM_USER_ROLE.ADMIN,
  ),
  blog_controller_1.BlogController.deleteBlog,
)
exports.BlogRoutes = router
