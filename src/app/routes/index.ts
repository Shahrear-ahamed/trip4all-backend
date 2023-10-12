import { Request, Response, Router } from 'express'

const router = Router()

const moduleRoutes = [
  {
    path: '/test',
    route: (req: Request, res: Response) => {
      res.send('Hello World')
    },
  },
]

moduleRoutes.forEach(route => {
  router.use(route.path, route.route)
})

export default router
