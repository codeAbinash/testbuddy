import Press from '@components/Press'
import { SemiBold } from '@utils/fonts'
import React from 'react'
import { StatusBar, View } from 'react-native'

export default function HomeScreen() {
  return (
    <View className='flex-1 items-center justify-center'>
      <StatusBar barStyle='dark-content' backgroundColor={'transparent'} />
      <Press>
        <SemiBold className='text-4xl text-zinc-800 active:text-lime-500 dark:text-white dark:active:text-red-500'>
          Testbuddy
        </SemiBold>
      </Press>
    </View>
  )
}
