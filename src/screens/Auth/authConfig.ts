import { AuthConfiguration } from 'react-native-app-auth'

export const authConfig: AuthConfiguration = {
  issuer: 'https://accounts.google.com',
  clientId: '519795476475-04ukdj5hgum2vv379cmhji57a5scljj0.apps.googleusercontent.com',
  redirectUrl: 'com.testbuddy:/oauth2redirect/google',
  scopes: ['openid', 'profile', 'email'],
  additionalParameters: {
    access_type: 'offline',
    prompt: 'select_account',
  },
  serviceConfiguration: {
    authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenEndpoint: 'https://oauth2.googleapis.com/token',
  },
  usePKCE: true,
  skipCodeExchange: true, // Set to true to get the raw authorization code
}
