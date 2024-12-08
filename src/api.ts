import { API, versionName } from '@/constants'
import { logout } from '@screens/Auth/utils'
import { secureLs } from '@utils/storage'
import axios from 'axios'
import { ToastAndroid } from 'react-native'

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

async function postApi<T>(path: string, data?: any) {
  type ServerT = T & ServerResponse
  try {
    return (await axios.post<ServerT>(path, data)).data
  } catch (error: any) {
    return handleError(error) as ServerT
  }
}

function handleError(error: any) {
  // Network error
  if (!error?.response) {
    handleNetworkError()
    return { message: DEFAULT_ERR }
  }

  switch (error?.response?.status) {
    case 401:
      handleUnauthenticated()
      return { message: error.response.data.message }
    case 400:
      return { message: error.response.data.message, statusCode: 400, status: false }
    default:
      return { message: 'Something Went Wrong!', statusCode: 500, status: false }
  }
}

function handleNetworkError() {
  ToastAndroid.show('No internet connection', ToastAndroid.SHORT)
}

function handleUnauthenticated() {
  ToastAndroid.show('Session Expired.', ToastAndroid.SHORT)
  console.log('Unauthenticated', 'Logging out')
  !__DEV__ && logout()
}

export type checkForUpdatesT = {
  updateRequired: boolean
  critical: boolean
  latestVersion: string
  versionCode: number
  message: string
}

function verifyOtp(d: { mobile: string; otp: string }) {
  type VerifyOtpT = {
    verified: boolean
    newUser: boolean
    user: {
      _id: string
      mobile: string
      emailVerified: boolean
      profilePic: string
      name: string
      stream: string
      std: string
    }
    token: string
  }
  return postApi<VerifyOtpT>('auth/verifyotp', d)
}

function profile() {
  type Profile = {
    _id: string
    mobile: string
    emailVerified: boolean
    profilePic: string
    name: string
    stream: string
    std: string
  }
  return postApi<Profile>('profile')
}

function homeScreen() {
  return postApi('/page/home')
}

const api = {
  verifyOtp,
  profile,
  homeScreen,
  sendOtp: (d: { mobile: string }) =>
    postApi<{
      newUser: boolean
      otpSent: boolean
    }>('auth/otp', d),
  checkForUpdates: () =>
    postApi<checkForUpdatesT>('app/version', {
      platform: 'android',
      versionName: versionName,
    }),
}

export default api
