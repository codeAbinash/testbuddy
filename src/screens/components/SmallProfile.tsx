import api from '@/api'
import Press from '@components/Press'
import { useQuery } from '@tanstack/react-query'
import { SemiBold, Medium } from '@utils/fonts'
import { T_5_MIN } from '@utils/utils'
import React from 'react'
import { Image, View } from 'react-native'

export default function SmallProfile() {
  const { data } = useQuery({
    queryKey: ['profile'],
    queryFn: api.profile,
    staleTime: T_5_MIN,
  })

  return (
    <View className='mt-2 w-full flex-row justify-between rounded-3xl bg-zinc-100 px-5 py-4 transition-colors active:bg-zinc-200 dark:bg-zinc-950 dark:active:bg-zinc-900'>
      <View className='flex-shrink gap-0.5'>
        <SemiBold className='text text-lg' numberOfLines={1}>
          Abinash Karmakar
        </SemiBold>
        <Medium className='text text-sm opacity-80' numberOfLines={1}>
          Dropper | Targeting 2025
        </Medium>
        <View className='flex-row gap-1.5'>
          <Medium className='text text-sm opacity-80'>Engineering</Medium>
          <Medium className='text-sm text-blue-500 active:underline'>Change?</Medium>
        </View>
      </View>
      <Press activeScale={0.95} className='items-center justify-center gap-1'>
        <Image source={{ uri: data?.profilePic }} className='rounded-full' style={{ height: 60, width: 60 }} />

        {/* <Medium className='text-xs text-blue-500' numberOfLines={1}>
          Edit Profile
        </Medium> */}
      </Press>
    </View>
  )
}
