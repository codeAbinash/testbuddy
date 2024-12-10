import { useRefreshByUser } from '@/hooks/useRefreshByUser'
import Animations from '@assets/animations/animations'
import { PaddingBottom } from '@components/SafePadding'
import api from '@query/apis'
import { useSuspenseQuery } from '@tanstack/react-query'
import { W } from '@utils/dimensions'
import { Medium } from '@utils/fonts'
import type { NavProps } from '@utils/types'
import { useColorScheme } from 'nativewind'
import { RefreshControl, ScrollView, View } from 'react-native'
import colors from 'tailwindcss/colors'
import { Lottie } from '../components/Lottie'
import BackHeader from './BackHeader'

export default function Notifications({ navigation }: NavProps) {
  const { colorScheme } = useColorScheme()
  const { isError, data, isPending, refetch } = useSuspenseQuery({
    queryKey: ['notificationsPage'],
    queryFn: api.notificationsPage,
  })

  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch)

  if (isError || data.isAlert)
    return (
      <Screen name='Notifications' message={data.message || 'Something went wrong.'} animation={Animations.astronaut} />
    )

  if (isPending)
    return (
      <Screen
        name='Notifications'
        message='Loading notifications...'
        animation={colorScheme === 'dark' ? Animations['rocket-dark'] : Animations['rocket-light']}
      />
    )

  if (data.length === 0)
    return (
      <Screen
        size={W * 0.5}
        name='Notifications'
        message='No notifications yet.'
        animation={Animations.notifications}
      />
    )

  return (
    <View className='screen-bg flex-1'>
      <BackHeader title='Notifications' navigation={navigation} />
      <ScrollView
        contentContainerClassName='px-5 py-3 gap-5'
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
        <Medium className='text text-sm opacity-90'>{JSON.stringify(data, null, 2)}</Medium>
        <PaddingBottom />
      </ScrollView>
    </View>
  )
}

function Screen({ message, animation, name, size }: { message?: string; animation: any; name: string; size?: number }) {
  return (
    <View className='screen-bg flex-1 justify-between'>
      <BackHeader title={name} />
      <View className='items-center justify-center'>
        <Lottie size={size} source={animation} />
        <Medium className='text text-center text-sm opacity-80'>{message}</Medium>
      </View>
      <View />
      <View />
    </View>
  )
}
