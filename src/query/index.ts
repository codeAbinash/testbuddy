import { API } from '@/constants'
import { logout } from '@screens/Auth/utils'
import axios, { AxiosRequestConfig } from 'axios'
import { ToastAndroid } from 'react-native'
import exe from './exe'

exe()

axios.defaults.baseURL = API

const DEFAULT_ERR = 'Error occurred. Please check your internet connection and try again'

interface ServerResponse {
  message?: string
  isAlert?: boolean
}
export async function postApi<T>(path: string, data?: any, config?: AxiosRequestConfig) {
  type ServerT = T & ServerResponse
  try {
    return (await axios.post<ServerT>(path, data, config)).data
  } catch (error: any) {
    return handleError(error) as ServerT
  }
}

function handleError(error: any) {
  // Network error
  if (!error?.response) {
    handleNetworkError()
    console.log(error)
    return { message: DEFAULT_ERR, isAlert: true }
  }

  switch (error?.response?.status) {
    case 401:
      handleUnauthenticated()
      return { message: error.response.data.message, isAlert: true }
    case 400:
      return { message: error.response.data.message, statusCode: 400, isAlert: true }
    default:
      return {
        message: 'Internal Server Error. Please try again later.',
        statusCode: 500,
        isAlert: true,
      }
  }
}

function handleNetworkError() {
  ToastAndroid.show('Network Error', ToastAndroid.SHORT)
}

function handleUnauthenticated() {
  ToastAndroid.show('Session Expired.', ToastAndroid.SHORT)
  console.log('Unauthenticated', 'Logging out')
  logout()
}

// export const citySearch = axios.create({
//   baseURL: 'https://www.universal-tutorial.com/api/getaccesstoken',
//   headers: {
//     Accept: 'application/json',
//     'api-token': citySearchAPIToken,
//     'user-email': userEmail,
//   },
// })
