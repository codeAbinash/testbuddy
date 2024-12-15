import { API } from '@/constants'
import NetInfo from '@react-native-community/netinfo'
import { useFocusEffect } from '@react-navigation/native'
import { logout } from '@screens/Auth/utils'
import { focusManager, onlineManager, QueryClient, type NotifyOnChangeProps } from '@tanstack/react-query'
import { secureLs } from '@utils/storage'
import axios from 'axios'
import React, { useEffect } from 'react'
import { AppState, Platform, ToastAndroid, type AppStateStatus } from 'react-native'

// Online Status Manager
onlineManager.setEventListener((setOnline) => {
  return NetInfo.addEventListener((state) => {
    setOnline(!!state.isConnected)
  })
})

// Refetch on App Focus
function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== 'web') {
    focusManager.setFocused(status === 'active')
  }
}
useEffect(() => {
  const subscription = AppState.addEventListener('change', onAppStateChange)
  return () => subscription.remove()
}, [])

// Refetch on Screen Focus
export function useRefreshOnFocus<T>(refetch: () => Promise<T>) {
  const firstTimeRef = React.useRef(true)
  useFocusEffect(
    React.useCallback(() => {
      if (firstTimeRef.current) {
        firstTimeRef.current = false
        return
      }
      refetch()
    }, [refetch]),
  )
}

// Disable re-renders on out of focus Screens
export function useFocusNotifyOnChangeProps(notifyOnChangeProps?: NotifyOnChangeProps) {
  const focusedRef = React.useRef(true)

  useFocusEffect(
    React.useCallback(() => {
      focusedRef.current = true

      return () => {
        focusedRef.current = false
      }
    }, []),
  )

  return () => {
    if (!focusedRef.current) {
      return []
    }

    if (typeof notifyOnChangeProps === 'function') {
      return notifyOnChangeProps()
    }

    return notifyOnChangeProps
  }
}

// Disable re-renders on out of focus Screens
export function useQueryFocusAware() {
  const focusedRef = React.useRef(true)

  useFocusEffect(
    React.useCallback(() => {
      focusedRef.current = true

      return () => {
        focusedRef.current = false
      }
    }, []),
  )

  return () => focusedRef.current
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnReconnect: true,
    },
  },
})

// export const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       select(data) {
//         // console.log(data)
//         handleUnauthorized(data as ServerResponse)
//         return data
//       },
//     },
//     mutations: {
//       onSuccess: (data) => {
//         // console.log(data)
//         handleUnauthorized(data as ServerResponse)
//       },
//     },
//   },
// })

// function handleUnauthorized(data: ServerResponse) {
//   if (data.message !== 'Unauthorized') return
//   navigation?.reset({
//     index: 0,
//     routes: [{ name: 'Login' }],
//   })
//   Alert.alert('Unauthorized', 'Please login again', [
//     {
//       text: 'OK',
//       onPress: () => {
//         navigation?.reset({
//           index: 0,
//           routes: [{ name: 'Login' }],
//         })
//       },
//     },
//   ])
// }

axios.defaults.baseURL = API

export function setAuthToken() {
  const token = secureLs.getString('token')
  if (token) axios.defaults.headers.common.Authorization = 'Bearer ' + token
}
setAuthToken()

const DEFAULT_ERR = 'Error occurred. Please check your internet connection and try again'
export interface ServerResponse {
  message?: string
  isAlert?: boolean
}

export async function postApi<T>(path: string, data?: any) {
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

export const citySearch = axios.create({
  baseURL: 'https://www.universal-tutorial.com/api/',
  headers: {
    Accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJhc2tAdW5pdmVyc2FsLXR1dG9yaWFsLmNvbSIsImFwaV90b2tlbiI6IlQ2VlBOUmZXbkxFbmdsMHd2djctZ1d2Y09KRHFPSkptc3ZoNkNOdGo5a3p1Z1RSYkhvdXVET1NXeTdzYmJzdG5taDAifSwiZXhwIjoxNzM0MzQxNjIxfQ.CnKLLZIh2lUJJfshue9OY2237sWgwLmDXPCKUl0FCds',
  },
})
