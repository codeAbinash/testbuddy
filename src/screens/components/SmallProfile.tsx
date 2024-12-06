import api from '@/api'
import { defaultProfilePic } from '@/constants'
import Press from '@components/Press'
import { useQuery } from '@tanstack/react-query'
import { Medium, SemiBold } from '@utils/fonts'
import type { ColorScheme } from '@utils/types'
import { T_5_MIN } from '@utils/utils'
import React from 'react'
import { Image, View } from 'react-native'

// Reusable ProfileSection component
const ProfileSection = ({
  profilePic,
  name,
  description,
}: {
  profilePic: string
  name: string
  description: string
}) => (
  <View className='mt-2 w-full flex-row justify-start gap-4 rounded-3xl bg-zinc-100 px-5 py-4 transition-colors active:bg-zinc-200 dark:bg-zinc-900 dark:active:bg-zinc-800'>
    <Press activeScale={0.95} className='items-center justify-center gap-1'>
      <Image
        source={{ uri: profilePic || defaultProfilePic }}
        className='rounded-full'
        style={{ height: 50, width: 50 }}
      />
    </Press>
    <View className='flex-shrink gap-0.5'>
      <SemiBold className='text text-lg' numberOfLines={1}>
        {name}
      </SemiBold>
      <Medium className='text text-sm opacity-80' numberOfLines={1}>
        {description}
      </Medium>
    </View>
  </View>
)

export default function SmallProfile({ colorScheme }: { colorScheme: ColorScheme }) {
  const { data } = useQuery({
    queryKey: ['profile'],
    queryFn: api.profile,
    staleTime: T_5_MIN,
  })

  return (
    <View className='gap-1.5'>
      <ProfileSection
        profilePic={data?.profilePic || ''}
        name='Abinash Karmakar'
        description='Dropper | Targeting 2025'
      />
    </View>
  )
}
