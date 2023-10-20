'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const sendResponse = (res, data) => {
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
exports.default = sendResponse
