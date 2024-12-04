import authStore from '@/zustand/authStore'
import Press from '@components/Press'
import { SemiBold } from '@utils/fonts'
import type { NavProp } from '@utils/types'
import React from 'react'
import { StatusBar, View } from 'react-native'

export default function HomeScreen({ navigation }: NavProp) {
  const removeToken = authStore((store) => store.removeToken)

  function handlePress() {
    removeToken()
    navigation.reset({ index: 0, routes: [{ name: 'Login' }] })
  }

  return (
    <View className='flex-1 items-center justify-center'>
      <StatusBar barStyle='dark-content' backgroundColor={'transparent'} />
      <Press>
        <SemiBold className='text-4xl text-zinc-800 active:text-lime-500 dark:text-white dark:active:text-red-500'>
          Testbuddy
        </SemiBold>
      </Press>
      <Press onPress={handlePress}>
        <SemiBold className='text-2xl text-blue-500'>Logout</SemiBold>
      </Press>
    </View>
  )
}
