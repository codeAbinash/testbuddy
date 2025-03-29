import { versionName } from '@/constants'
import authStore from '@/zustand/authStore'
import { navigationStore } from '@/zustand/navigationStore'
import AppIcon from '@assets/icon.svg'
import AppIconLight from '@assets/icon_light.svg'
import startApi from '@query/api/start'
import { queryClient } from '@query/query'
import { useQuery } from '@tanstack/react-query'
import { SemiBold } from '@utils/fonts'
import type { NavProps } from '@utils/types'
import { useColorScheme } from 'nativewind'
import { useEffect } from 'react'
import { Platform, View } from 'react-native'

// todo: Add locations and device information to the start api, also get the premium status from the api 
export default function Splash({ navigation }: NavProps) {
  const { token } = authStore()
  const { colorScheme } = useColorScheme()
  const setNavigation = navigationStore((state) => state.setNavigation)

  const { data: startData } = useQuery({
    queryKey: ['start'],
    queryFn: () => startApi(),
  })

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    setNavigation(navigation)
  }, [navigation])

  // If token is not present, navigate to login screen
  useEffect(() => {
    if (!token) navigation.replace('Login')
  }, [navigation, token])

  // If version is less than critical version, navigate to update screen
  useEffect(() => {
    if (!startData) return

    console.log(startData)

    const criticalVersion =
      Platform.OS === 'ios' ? startData.appVersions.iosCriticalVersion : startData.appVersions.androidCriticalVersion
    const latestVersion =
      Platform.OS === 'ios' ? startData.appVersions.iosLatestVersion : startData.appVersions.androidLatestVersion

    if (criticalVersion > versionName) {
      return navigation.replace('Update', {
        critical: true,
        latestVersion: latestVersion,
      })
    }

    navigation.replace('HomeDrawer')
  }, [startData, navigation])

  // Set profile data
  useEffect(() => {
    if (!startData) return
    queryClient.setQueryData(['profile'], startData.userDetails)
  }, [startData])

  return (
    <View className='flex-1 items-center justify-center'>
      {colorScheme === 'dark' ? <AppIcon width={215} height={215} /> : <AppIconLight width={215} height={215} />}
      <SemiBold className='text -mt-8 text-xl'>TestBuddy</SemiBold>
    </View>
  )
}
