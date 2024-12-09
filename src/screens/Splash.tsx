import authStore from '@/zustand/authStore'
import { navigationStore } from '@/zustand/navigationStore'
import AppIcon from '@assets/icon.svg'
import AppIconLight from '@assets/icon_light.svg'
import api from '@query/apis'
import { useMutation } from '@tanstack/react-query'
import { SemiBold } from '@utils/fonts'
import type { NavProps } from '@utils/types'
import { useColorScheme } from 'nativewind'
import { useEffect } from 'react'
import { View } from 'react-native'

export default function Splash({ navigation }: NavProps) {
  const { token } = authStore()
  const { colorScheme } = useColorScheme()
  const setNavigation = navigationStore((state) => state.setNavigation)
  const { mutate } = useMutation({
    mutationKey: ['checkForUpdate'],
    mutationFn: api.checkForUpdates,
    onSuccess: (data) => {
      if (data?.critical && data.updateRequired) {
        navigation.reset({ index: 0, routes: [{ name: 'Update', params: { data } }] })
      }
    },
  })

  useEffect(() => {
    mutate()
  }, [])

  useEffect(() => {
    setNavigation(navigation)
  }, [navigation])

  useEffect(() => {
    if (!token) navigation.replace('Login')
    else navigation.replace('HomeDrawer')
  }, [navigation, token])

  return (
    <View className='flex-1 items-center justify-center'>
      {colorScheme === 'dark' ? <AppIcon width={215} height={215} /> : <AppIconLight width={215} height={215} />}
      <SemiBold className='text -mt-10 text-xl'>TestBuddy</SemiBold>
    </View>
  )
}
