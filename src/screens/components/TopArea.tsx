import api from '@/api'
import { FireIcon, Menu02Icon, Notification03Icon, Search01Icon } from '@assets/icons/icons'
import Press from '@components/Press'
import { PaddingTop } from '@components/SafePadding'
import { useQuery } from '@tanstack/react-query'
import { H } from '@utils/dimensions'
import { Medium } from '@utils/fonts'
import { T_5_MIN } from '@utils/utils'
import { useColorScheme } from 'nativewind'
import React from 'react'
import { Image, View } from 'react-native'
import colors from 'tailwindcss/colors'

export default function TopArea() {
  const { colorScheme } = useColorScheme()
  const { data } = useQuery({
    queryKey: ['profile'],
    queryFn: api.profile,
    staleTime: T_5_MIN,
  })

  return (
    <>
      <View className='w-full px-5 pb-3 pt-1'>
        <PaddingTop />
        <View className='flex-row items-center justify-between'>
          <Press className='flex-row items-center gap-3'>
            <Menu02Icon height={24} width={24} color={colorScheme === 'dark' ? colors.zinc[300] : colors.zinc[700]} />
            <View className='flex-row items-center justify-center gap-3'>
              <Image source={{ uri: data?.profilePic }} className='h-9 w-9 rounded-full' />
              <Medium>Hi {data?.name ?? 'User'}</Medium>
            </View>
          </Press>
          <View className='flex-row items-center justify-between gap-6'>
            <Press activeScale={0.9}>
              <Search01Icon
                height={20}
                width={20}
                color={colorScheme === 'dark' ? colors.zinc[300] : colors.zinc[700]}
              />
            </Press>
            <Press activeScale={0.9}>
              <FireIcon height={21} width={21} color={colorScheme === 'dark' ? colors.zinc[300] : colors.zinc[700]} />
            </Press>
            <Press activeScale={0.9}>
              <Notification03Icon
                height={21}
                width={21}
                color={colorScheme === 'dark' ? colors.zinc[300] : colors.zinc[700]}
              />
            </Press>
          </View>
        </View>
      </View>
    </>
  )
}
