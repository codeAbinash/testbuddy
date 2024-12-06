import api from '@/api'
import { defaultProfilePic } from '@/constants'
import sidebarStore from '@/zustand/sidebarStore'
import { FireIcon, Menu02Icon, Notification03Icon, Search01Icon } from '@assets/icons/icons'
import Press from '@components/Press'
import { PaddingTop } from '@components/SafePadding'
import { useQuery } from '@tanstack/react-query'
import { Medium } from '@utils/fonts'
import { T_5_MIN } from '@utils/utils'
import { useColorScheme } from 'nativewind'
import React from 'react'
import { Image, View } from 'react-native'
import colors from 'tailwindcss/colors'

export default function TopArea() {
  const { colorScheme } = useColorScheme()
  const toggle = sidebarStore((state) => state.toggle)
  const { data } = useQuery({
    queryKey: ['profile'],
    queryFn: api.profile,
    staleTime: T_5_MIN,
  })

  return (
    <>
      <View className='w-full bg-white px-5 pb-3 pt-1 dark:bg-zinc-950'>
        <PaddingTop />
        <View className='flex-row items-center justify-between'>
          <Press className='flex-shrink flex-row items-center gap-2' onPress={toggle}>
            <Menu02Icon height={24} width={24} color={colorScheme === 'dark' ? colors.zinc[300] : colors.zinc[700]} />
            <View className='flex-shrink flex-row items-center justify-center gap-3'>
              <Image source={{ uri: data?.profilePic || defaultProfilePic }} className='h-9 w-9 rounded-full' />
              <Medium className='text mr-2 flex-shrink' numberOfLines={1}>
                Hi, {data?.name ?? 'User'}
              </Medium>
            </View>
          </Press>
          <View className='flex-row items-center justify-between gap-6'>
            <Press activeScale={0.9} className='relative'>
              <Search01Icon
                height={20}
                width={20}
                color={colorScheme === 'dark' ? colors.zinc[300] : colors.zinc[700]}
              />
            </Press>
            <Press activeScale={0.9} className='relative'>
              <FireIcon height={23} width={23} color={colorScheme === 'dark' ? colors.zinc[300] : colors.zinc[700]} />
              <NotificationCount count={36} />
            </Press>
            <Press activeScale={0.9}>
              <Notification03Icon
                height={23}
                width={23}
                color={colorScheme === 'dark' ? colors.zinc[300] : colors.zinc[700]}
              />
              <NotificationCount count={266} />
            </Press>
          </View>
        </View>
      </View>
    </>
  )
}

function NotificationCount({ count }: { count: number }) {
  return (
    <View className='absolute -mt-1 ml-4 size-5 items-center justify-center rounded-full bg-red-500'>
      <Medium style={{ fontSize: 9 }} className='mb-1 text-center text-xs text-white'>
        {count > 99 ? '99+' : count}
      </Medium>
    </View>
  )
}
