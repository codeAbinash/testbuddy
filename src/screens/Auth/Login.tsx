import Btn from '@components/Button'
import { PaddingBottom, PaddingTop } from '@components/SafePadding'
import { SemiBold } from '@utils/fonts'
import React from 'react'
import { View } from 'react-native'

export default function Login() {
  return (
    <View className='flex-1 items-center justify-center gap-10'>
      <PaddingTop />
      <SemiBold className='text-center text-2xl text-gray-900 dark:text-gray-100'>Testbuddy</SemiBold>
      <View className='w-full px-5'>
        <Btn title='Send OTP' />
      </View>
      <PaddingBottom />
    </View>
  )
}
