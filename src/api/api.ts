import { secureLs } from '@utils/storage'
import axios from 'axios'

const API = 'https://api.testbuddy.live/v1'
axios.defaults.baseURL = API

export function setAuthToken() {
  const token = secureLs.getString('token')
  if (token) axios.defaults.headers.common.Authorization = 'Bearer ' + token
}
setAuthToken()

const DEFAULT_ERR = 'Error occurred. Please check your internet connection and try again'
export interface ServerResponse {
  message?: string
}

async function postApi<T>(path: string, data: any) {
  type ServerT = T & ServerResponse
  try {
    if (data) return (await axios.post<ServerT>(path, data)).data
    else return (await axios.post<ServerT>(path)).data
  } catch (error: any) {
    handleError(error)
  }
}
function handleError(error: any) {
  // if (error?.response?.status === 401 || error?.response.data.message === 'Unauthenticated.') ShowAlertAndRestart()
  // console.log(JSON.stringify(error.response.data, null, 2))
  // const errors = error?.response.data.errors
  // const singleError = errors[Object.keys(errors)[0]][0]
  // throw new Error(singleError || DEFAULT_ERR)
}

const api = {
  sendOtp: (d: { mobile: string }) =>
    postApi<{
      newUser: boolean
      otpSent: boolean
    }>('auth/otp', d),
}

export default api
