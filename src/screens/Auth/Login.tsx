import Btn from '@components/Button'
import { PaddingBottom, PaddingTop } from '@components/SafePadding'
import { Medium } from '@utils/fonts'
import React from 'react'
import { View } from 'react-native'

export default function Login() {
  return (
    <View className='flex-1 items-center justify-center gap-10'>
      <PaddingTop />
      <Medium className='text-center text-accent dark:text-gray-300'>Hello World</Medium>
      <View className='w-full px-5'>
        <Btn
          title='Send OTP'
          onPress={() => {
            console.log('Login')
          }}
          className='bg-accent'
        />
      </View>
      <PaddingBottom />
    </View>
  )
}
