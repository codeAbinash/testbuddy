import { defaultProfilePic } from '@/constants'
import popupStore from '@/zustand/popupStore'
import { Logout03StrokeRoundedIcon } from '@assets/icons/icons'
import Press from '@components/Press'
import api from '@query/api'
import type { DrawerContentComponentProps } from '@react-navigation/drawer'
import { logout } from '@screens/Auth/utils'
import { useQuery } from '@tanstack/react-query'
import { Medium, SemiBold } from '@utils/fonts'
import { useColorScheme } from 'nativewind'
import { useCallback } from 'react'
import { Image, View } from 'react-native'
import colors from 'tailwindcss/colors'

export default function SmallProfile({ navigation }: { navigation: DrawerContentComponentProps['navigation'] }) {
  const { colorScheme } = useColorScheme()
  const alert = popupStore((state) => state.alert)
  const { data } = useQuery({
    queryKey: ['profile'],
    queryFn: api.profile,
  })

  const handleLogout = useCallback(() => {
    alert('Are you sure?', 'You will be logged out of the app.', [
      { text: 'Cancel' },
      { text: 'Log out', onPress: logout },
    ])
  }, [])

  return (
    <View className='w-full flex-row justify-between rounded-3xl bg-zinc-100 p-0 pl-4 transition-colors active:bg-zinc-200 dark:bg-zinc-900 dark:active:bg-zinc-800'>
      <View className='flex-shrink flex-row items-center justify-center gap-4'>
        <Press activeScale={0.95} className='items-center justify-center gap-1'>
          <Image
            source={{ uri: data?.profilePic || defaultProfilePic }}
            className='rounded-full'
            style={{ height: 45, width: 45 }}
          />
        </Press>
        <View className='flex-shrink gap-0.5'>
          <SemiBold className='text text-base' numberOfLines={1}>
            {/* {data?.name} */}
            Abinash Karmakar
          </SemiBold>
          <Medium className='text text-sm opacity-80' numberOfLines={1}>
            {/* {data?.stream} */}
            Dropper | Targeting 2025
          </Medium>
        </View>
      </View>
      <Press className='items-center justify-center py-6 pl-4 pr-6' activeScale={0.9} onPress={handleLogout}>
        <Logout03StrokeRoundedIcon
          height={24}
          width={24}
          color={colorScheme === 'dark' ? colors.zinc[300] : colors.zinc[700]}
        />
      </Press>
    </View>
  )
}
