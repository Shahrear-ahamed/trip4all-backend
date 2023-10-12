// Define your interfaces here

export type IReturnToken = {
  accessToken: string
  refreshToken: string
}

export type IChangePassword = {
  oldPassword: string
  newPassword: string
}
