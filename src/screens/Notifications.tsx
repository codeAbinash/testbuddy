import { useRefreshByUser } from '@/hooks/useRefreshByUser'
import Animations from '@assets/animations/animations'
import {
  BubbleChatNotificationStrokeRoundedIcon,
  Message01StrokeRoundedIcon,
  NotificationSquareStrokeRoundedIcon,
  Search01Icon,
} from '@assets/icons/icons'
import { PaddingBottom } from '@components/SafePadding'
import { getAllNotifications } from '@query/api/notifications/getAllNotifications'
import { type Notification } from '@query/api/notifications/types'
import { useSuspenseQuery } from '@tanstack/react-query'
import { W } from '@utils/dimensions'
import { Medium } from '@utils/fonts'
import { useColorScheme } from 'nativewind'
import { Linking, RefreshControl, ScrollView, TouchableOpacity, View } from 'react-native'
import colors from 'tailwindcss/colors'
import { Lottie } from '../components/Lottie'
import BackHeader from './components/BackHeader'

export default function Notifications() {
  const { colorScheme } = useColorScheme()
  const { isError, data, isPending, refetch } = useSuspenseQuery({
    queryKey: ['notificationsPage'],
    queryFn: getAllNotifications,
  })

  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch)

  const notifications = data.data || []

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

  if (notifications.length === 0)
    return (
      <Screen
        size={W * 0.5}
        name='Notifications'
        message='No notifications yet.'
        animation={Animations.notifications}
      />
    )

  return (
    <View className='bg-screen flex-1'>
      <BackHeader
        title='Notifications'
        Right={
          <Search01Icon color={colorScheme === 'dark' ? colors.zinc[300] : colors.zinc[700]} height={20} width={20} />
        }
      />
      <ScrollView
        contentContainerClassName='px-4 pt-2'
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
        {notifications.map((noti) => (
          <Notification key={noti._id} noti={noti} />
        ))}
        <PaddingBottom />
      </ScrollView>
    </View>
  )
}

function Notification({ noti }: { noti: Notification }) {
  return (
    <TouchableOpacity
      onPress={() => Linking.openURL(noti.redirectTo || '')}
      activeOpacity={0.8}
      className='flex-shrink justify-center border border-x-0 border-t-0 border-b-zinc-100 px-2.5 py-4 dark:border-b-zinc-900'
    >
      <View className='flex-row items-center gap-4'>
        <NotificationIcon noti={noti} />
        <View className='shrink'>
          <Medium className='text flex-shrink text-sm'>{noti.body}</Medium>
          <Medium className='text text-sm opacity-60'>{new Date(noti.createdAt || '').toLocaleString()}</Medium>
        </View>
      </View>
    </TouchableOpacity>
  )
}

function NotificationIcon({ noti }: { noti: Notification }) {
  switch (noti.notificationType) {
    case 'specific':
      return <Message01StrokeRoundedIcon color={colors.green[500]} height={25} width={25} />
    case 'group':
      return <BubbleChatNotificationStrokeRoundedIcon color={colors.amber[500]} height={25} width={25} />
    case 'general':
      return <NotificationSquareStrokeRoundedIcon color={colors.blue[500]} height={25} width={25} />
  }
}

type ScreenProps = {
  message?: string
  animation: any
  name: string
  size?: number
}

export function Screen({ message, animation, name, size }: ScreenProps) {
  return (
    <View className='bg-screen flex-1 justify-between'>
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
