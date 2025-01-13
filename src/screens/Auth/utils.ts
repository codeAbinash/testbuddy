import authStore from '@/zustand/authStore'
import { navigationStore } from '@/zustand/navigationStore'
import popupStore from '@/zustand/popupStore'
import { queryClient } from '@query/query'

export function normalizePhoneNumber(phoneNumber: string): string {
  return phoneNumber.startsWith('+91') ? phoneNumber : '+91' + phoneNumber
}

export function logout() {
  const navigation = navigationStore.getState().navigation
  authStore.getState().removeToken()
  popupStore.getState().clear()
  queryClient.clear()
  navigation?.reset({ index: 0, routes: [{ name: 'Login' }] })
}
