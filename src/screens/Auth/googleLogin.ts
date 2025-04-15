import api from '@/query/api/api'
import authStore from '@/zustand/authStore'
import { navigationStore } from '@/zustand/navigationStore'

import { Alert } from 'react-native'
import { authorize } from 'react-native-app-auth'
import { authConfig } from './authConfig'

export const handleGoogleLogin = async () => {
  try {
    // Request authentication from Google
    const result = await authorize(authConfig)

    // Extract tokens and authorization code
    const { idToken, accessToken, authorizationCode } = result

    console.log(result)

    // Use the API utility for consistent error handling
    const data = await api.googleAuth({
      code: authorizationCode,
      accessToken,
      idToken,
    })

    console.log(data)

    // Check if the response contains an error message
    if (data?.isAlert || !data) {
      Alert.alert('Login Failed', data?.message || 'Authentication failed. Please try again.')
      return
    }

    // Check if we received a token
    if (data.token) {
      // Store the token from response
      authStore.getState().setToken(data.token)

      // Navigate based on whether user is new or existing
      const navigation = navigationStore.getState().navigation
      if (data.newUser === true && data.email) {
        navigation?.reset({
          index: 0,
          routes: [{ name: 'Register', params: { mobile: data.email } }],
        })
      } else {
        navigation?.reset({
          index: 0,
          routes: [{ name: 'HomeDrawer' }],
        })
      }
    } else {
      Alert.alert('Login Failed', 'No authentication token received. Please try again.')
    }
  } catch (error: any) {
    console.log(error)
  }
}
