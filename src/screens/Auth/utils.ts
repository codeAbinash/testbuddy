import authStore from '@/zustand/authStore'
import { queryClient } from '@query/index'
import type { DrawerContentComponentProps } from '@react-navigation/drawer'
import type { StackNav } from '@utils/types'

export function normalizePhoneNumber(phoneNumber: string): string {
  return phoneNumber.startsWith('+91') ? phoneNumber : '+91' + phoneNumber
}

export function logout(navigation: StackNav | DrawerContentComponentProps['navigation']) {
  queryClient.clear()
  authStore.getState().removeToken()
  navigation.reset({ index: 0, routes: [{ name: 'Login' }] })
}
