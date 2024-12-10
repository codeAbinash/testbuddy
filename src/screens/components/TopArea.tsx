import { defaultProfilePic } from '@/constants'
import { FireIcon, Menu02Icon, Notification03Icon, Search01Icon } from '@assets/icons/icons'
import Press from '@components/Press'
import { PaddingTop } from '@components/SafePadding'
import api from '@query/api'
import { useQuery } from '@tanstack/react-query'
import { Medium } from '@utils/fonts'
import type { DrawerProps } from '@utils/types'
import { useColorScheme } from 'nativewind'
import { useEffect } from 'react'
import { Image, View } from 'react-native'
import colors from 'tailwindcss/colors'

export default function TopArea({ navigation }: DrawerProps) {
  const { colorScheme } = useColorScheme()
  const { data } = useQuery({
    queryKey: ['profile'],
    queryFn: api.profile,
  })

  const notifications = useQuery({
    queryKey: ['notifications'],
    queryFn: api.notifications,
  })

  useEffect(() => {
    if (data) {
      if (data.newUser) {
        navigation.reset({ index: 0, routes: [{ name: 'Register', params: { mobile: data.mobile } }] })
      }
    }
  }, [data])

  return (
    <>
      <View className='w-full bg-white px-5 pb-2 pr-3 dark:bg-zinc-950'>
        <PaddingTop />
        <View className='flex-row items-center justify-between'>
          <Press className='flex-shrink flex-row items-center gap-2' onPress={navigation.openDrawer}>
            <Menu02Icon height={24} width={24} color={colorScheme === 'dark' ? colors.zinc[300] : colors.zinc[700]} />
            <View className='flex-shrink flex-row items-center justify-center gap-3'>
              <Image source={{ uri: data?.profilePic || defaultProfilePic }} className='h-9 w-9 rounded-full' />
              <Medium className='text mr-2 flex-shrink' numberOfLines={1}>
                Hi, {data?.name.split(' ')[0] ?? 'User'}
              </Medium>
            </View>
          </Press>
          <View className='flex-row items-center justify-between'>
            <Press activeScale={0.9} className='px-3 py-2 pb-2.5' onPress={() => navigation.navigate('Search')}>
              <Search01Icon
                height={20}
                width={20}
                color={colorScheme === 'dark' ? colors.zinc[300] : colors.zinc[700]}
              />
            </Press>
            <Press activeScale={0.9} onPress={() => navigation.navigate('Streaks')} className='px-3 py-2 pb-2.5'>
              <FireIcon height={23} width={23} color={colorScheme === 'dark' ? colors.zinc[300] : colors.zinc[700]} />
              <NotificationCount count={36} />
            </Press>
            <Press activeScale={0.9} onPress={() => navigation.navigate('Notifications')} className='px-3 py-2 pb-2.5'>
              <Notification03Icon
                height={23}
                width={23}
                color={colorScheme === 'dark' ? colors.zinc[300] : colors.zinc[700]}
              />
              <NotificationCount count={notifications.data?.length || 0} />
            </Press>
          </View>
        </View>
      </View>
    </>
  )
}

function NotificationCount({ count }: { count: number }) {
  if (!count) return null
  return (
    <View className='absolute ml-7 mt-1 size-5 items-center justify-center rounded-full bg-red-500'>
      <Medium style={{ fontSize: 9 }} className='mb-1 text-center text-xs text-white'>
        {count > 99 ? '99+' : count}
      </Medium>
    </View>
  )
}
