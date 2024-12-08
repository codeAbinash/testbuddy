import authStore from '@/zustand/authStore'
import { navigationStore } from '@/zustand/navigationStore'
import { queryClient } from '@query/index'

export function normalizePhoneNumber(phoneNumber: string): string {
  return phoneNumber.startsWith('+91') ? phoneNumber : '+91' + phoneNumber
}

export function logout() {
  const navigation = navigationStore.getState().navigation
  authStore.getState().removeToken()
  queryClient.clear()
  navigation?.reset({ index: 0, routes: [{ name: 'Login' }] })
}
