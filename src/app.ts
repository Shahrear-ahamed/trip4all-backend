import cookieParser from 'cookie-parser'
import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import httpStatus from 'http-status'
import router from './app/routes'
import globalErrorHandler from './app/middlewares/globalErrorHandler'

const app: Application = express()

// Enable CORS
app.use(cors({ origin: 'http://localhost:3000', credentials: true }))

// Parse JSON bodies
app.use(express.json())
app.use(cookieParser())

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }))

// home route
app.get('/', (req: Request, res: Response) => {
  res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'Welcome to the API',
  })
})

// rest of the routes
app.use('/api/v1', router)

// 404 handler
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  })

  next()
})

// global error handler
app.use(globalErrorHandler)

export default app
