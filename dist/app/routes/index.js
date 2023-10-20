'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const express_1 = require('express')
const auth_routes_1 = require('../modules/auth/auth.routes')
const user_routes_1 = require('../modules/user/user.routes')
const faq_routes_1 = require('../modules/faq/faq.routes')
const blog_routes_1 = require('../modules/blog/blog.routes')
const tag_routes_1 = require('../modules/tag/tag.routes')
const service_routes_1 = require('../modules/service/service.routes')
const booking_routes_1 = require('../modules/booking/booking.routes')
const category_routes_1 = require('../modules/category/category.routes')
const router = (0, express_1.Router)()
const moduleRoutes = [
  {
    path: '/auth',
    route: auth_routes_1.AuthRoutes,
  },
  {
    path: '/users',
    route: user_routes_1.UserRoutes,
  },
  {
    path: '/faqs',
    route: faq_routes_1.FaqRoutes,
  },
  {
    path: '/blogs',
    route: blog_routes_1.BlogRoutes,
  },
  {
    path: '/tags',
    route: tag_routes_1.TagRoutes,
  },
  {
    path: '/services',
    route: service_routes_1.ServiceRoutes,
  },
  {
    path: '/bookings',
    route: booking_routes_1.BookingRoutes,
  },
  {
    path: '/categories',
    route: category_routes_1.CategoryRoutes,
  },
]
moduleRoutes.forEach(route => {
  router.use(route.path, route.route)
})
exports.default = router
