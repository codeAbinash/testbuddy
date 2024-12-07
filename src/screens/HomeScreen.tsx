import Press from '@components/Press'
import { SemiBold } from '@utils/fonts'
import type { NavProps } from '@utils/types'
import React from 'react'
import { StatusBar, View } from 'react-native'

export default function HomeScreen({ navigation }: NavProps) {
  return (
    <>
      <StatusBar barStyle='dark-content' backgroundColor={'transparent'} />
      <View className='flex-1 items-center justify-center gap-5 bg-zinc-50 px-5 dark:bg-black'>
        <Press>
          <SemiBold className='text-4xl text-zinc-800 transition-colors active:text-lime-500 dark:text-white'>
            Testbuddy
          </SemiBold>
        </Press>
      </View>
    </>
  )
}
