import Btn from '@components/Button'
import { PaddingBottom, PaddingTop } from '@components/SafePadding'
import type { RouteProp } from '@react-navigation/native'
import { W } from '@utils/dimensions'
import { Bold, JosefinSansSemiBold, Medium, SemiBold } from '@utils/fonts'
import type { StackNav } from '@utils/types'
import LottieView from 'lottie-react-native'
import { useColorScheme } from 'nativewind'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { OtpInput } from 'react-native-otp-entry'
import colors from 'tailwindcss/colors'

type ParamList = {
  VerifyOtp: OtpParamList
}

export type OtpParamList = {
  mobile: string
}

export default function VerifyOtp({ route }: { navigation: StackNav; route: RouteProp<ParamList, 'VerifyOtp'> }) {
  const { mobile } = route.params || {
    mobile: '9876543210',
  }
  const { colorScheme } = useColorScheme()
  return (
    <View className='flex-1 justify-between px-7'>
      <PaddingTop />
      <View>
        <LottieView
          source={require('../../assets/animations/message.lottie')}
          style={{ height: W * 0.75, width: W * 0.75, marginLeft: 'auto', marginRight: 'auto' }}
          speed={0.7}
          autoPlay
          loop
          hardwareAccelerationAndroid
          cacheComposition
        />
        <View className='gap-3'>
          <Bold className='text w-full text-center text-3xl'>Verify OTP</Bold>
          <Medium className='text w-full text-center text-sm opacity-80'>
            We have send a verification code to {'\n'} +91-{mobile}{' '}
            <SemiBold className='text-blue-500 active:underline'>change?</SemiBold>
          </Medium>
        </View>
      </View>
      <OtpInput
        numberOfDigits={4}
        focusColor={colorScheme === 'dark' ? colors.zinc[300] : colors.zinc[700]}
        focusStickBlinkingDuration={500}
        blurOnFilled
        hideStick
        onTextChange={(text) => console.log(text)}
        onFilled={(text) => console.log(`OTP is ${text}`)}
        textInputProps={{
          accessibilityLabel: 'One-Time Password',
          selectionColor: 'transparent',
        }}
        theme={{
          containerStyle: styles.container,
          pinCodeContainerStyle: {
            borderColor: colorScheme === 'dark' ? colors.zinc[700] : colors.zinc[300],
            height: 'auto',
            paddingTop: 11,
            paddingBottom: 15,
            width: 50,
            borderWidth: 1.5,
          },
          pinCodeTextStyle: {
            ...JosefinSansSemiBold,
            fontSize: 18,
            color: colorScheme === 'dark' ? colors.zinc[300] : colors.zinc[700],
          },
        }}
      />
      <View className='gap-8'>
        <Btn title='Verify OTP' />
        <Medium className='text w-full text-center text-sm opacity-80'>
          Didn't receive the code? <SemiBold className='text-blue-500 active:underline'>Resend</SemiBold>
        </Medium>
      </View>
      <View />
      <PaddingBottom />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
})
