import popupStore from '@/zustand/popupStore'
import Btn from '@components/Button'
import { Medium } from '@utils/fonts'
import type { NavProps } from '@utils/types'
import React from 'react'
import { View } from 'react-native'

export default function Test({ navigation }: NavProps) {
  const alert = popupStore((store) => store.alert)

  return (
    <View className='flex-1 items-center justify-center px-5'>
      <Medium className='mb-5 text-center text-base text-black dark:text-white'>
        This is a test Screen. Functional and state based custom Modal Alert testing for this application.
      </Medium>
      <Btn
        onPress={() => {
          alert('Test Alert', 'This is a test alert message.')
        }}
      >
        Open Modal
      </Btn>
      <Medium className='mt-5 text-black dark:text-white'>
        Go to{' '}
        <Medium className='text-blue-400 active:underline' onPressOut={() => navigation.navigate('Splash')}>
          Splash Screen
        </Medium>
      </Medium>
    </View>
  )
}
