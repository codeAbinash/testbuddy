import api from '@/api'
import { useRefreshByUser } from '@/hooks/useRefreshByUser'
import { useQuery } from '@tanstack/react-query'
import { Medium } from '@utils/fonts'
import type { NavProps } from '@utils/types'
import { useColorScheme } from 'nativewind'
import React from 'react'
import { RefreshControl, ScrollView, StatusBar } from 'react-native'
import colors from 'tailwindcss/colors'

export default function HomeScreen({ navigation }: NavProps) {
  const { colorScheme } = useColorScheme()
  const { data, refetch } = useQuery({
    queryKey: ['homeScreen'],
    queryFn: api.homeScreen,
  })
  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch)

  return (
    <>
      <StatusBar barStyle='dark-content' backgroundColor={'transparent'} />
      <ScrollView
        className='bg-zinc-50 px-5 dark:bg-black'
        contentContainerClassName=''
        refreshControl={
          <RefreshControl
            refreshing={isRefetchingByUser}
            onRefresh={refetchByUser}
            style={{ zIndex: 1000 }}
            progressBackgroundColor={colorScheme === 'dark' ? colors.zinc[800] : 'white'}
            colors={colorScheme === 'dark' ? ['white'] : ['black']}
          />
        }
      >
        <Medium className='text text-xs'>{JSON.stringify(data, null, 2)}</Medium>
      </ScrollView>
    </>
  )
}
