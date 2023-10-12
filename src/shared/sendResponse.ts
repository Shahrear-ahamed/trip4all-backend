import { Response } from 'express'

type IApiSendResponse<T, K> = {
  statusCode: number
  success: boolean
  message?: string | null
  meta?: {
    page: number
    limit: number
    total: number
    totalPage: number
  }
  data?: T | null
  token?: K | null
}

const sendResponse = <T, K>(res: Response, data: IApiSendResponse<T, K>) => {
  const responseData = {
    statusCode: data.statusCode,
    success: data.success,
    message: data.message || undefined,
    meta: data.meta || undefined,
    data: data.data || undefined,
    token: data.token || undefined,
  }
  res.status(data.statusCode).json(responseData)
}

export default sendResponse
