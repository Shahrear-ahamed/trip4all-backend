import { Router } from 'express'
import { AuthRoutes } from '../modules/auth/auth.routes'
import { UserRoutes } from '../modules/user/user.routes'
import { FaqRoutes } from '../modules/faq/faq.routes'
import { BlogRoutes } from '../modules/blog/blog.routes'
import { TagRoutes } from '../modules/tag/tag.routes'
import { ServiceRoutes } from '../modules/service/service.routes'
import { BookingRoutes } from '../modules/booking/booking.routes'
import { CategoryRoutes } from '../modules/category/category.routes'
import { FeedbackRoutes } from '../modules/feedback/feedback.routes'

const router = Router()

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/faqs',
    route: FaqRoutes,
  },
  {
    path: '/blogs',
    route: BlogRoutes,
  },
  {
    path: '/tags',
    route: TagRoutes,
  },
  {
    path: '/services',
    route: ServiceRoutes,
  },
  {
    path: '/bookings',
    route: BookingRoutes,
  },
  {
    path: '/categories',
    route: CategoryRoutes,
  },
  {
    path: '/feedbacks',
    route: FeedbackRoutes,
  },
]

moduleRoutes.forEach(route => {
  router.use(route.path, route.route)
})

export default router
