import popupStore from '@/zustand/popup'
import Btn from '@components/Button'
import { PaddingBottom, PaddingTop } from '@components/SafePadding'
import type { RouteProp } from '@react-navigation/native'
import { W } from '@utils/dimensions'
import { Bold, JosefinSansSemiBold, Medium, SemiBold } from '@utils/fonts'
import type { StackNav } from '@utils/types'
import LottieView from 'lottie-react-native'
import { useColorScheme } from 'nativewind'
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { OtpInput } from 'react-native-otp-entry'
import colors from 'tailwindcss/colors'

type ParamList = {
  VerifyOtp: OtpParamList
}

export type OtpParamList = {
  mobile: string
}

type VerifyOtpProps = {
  navigation: StackNav
  route: RouteProp<ParamList, 'VerifyOtp'>
}

export default function VerifyOtp({ route, navigation }: VerifyOtpProps) {
  const [otp, setOtp] = useState('')
  const { mobile } = route.params
  const { colorScheme } = useColorScheme()
  const alert = popupStore((store) => store.alert)

  const verifyOtp = (otp: string) => {
    if (!otp) return alert('OTP is required', 'Please enter the OTP sent to your mobile number.')
    if (otp.length < 4) return alert('Invalid OTP', 'Please enter a valid OTP. It should be 4 digits long.')
    console.log(`Verifying OTP: ${otp}`)
    navigation.reset({ index: 0, routes: [{ name: 'Home' }] })
  }

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
            We have sent a verification code to {'\n'} {mobile}{' '}
            <SemiBold className='text-blue-500 active:underline' onPress={navigation.goBack}>
              change?
            </SemiBold>
          </Medium>
        </View>
      </View>
      <OtpInput
        numberOfDigits={4}
        focusColor={colorScheme === 'dark' ? colors.zinc[300] : colors.zinc[700]}
        focusStickBlinkingDuration={500}
        blurOnFilled
        hideStick
        onTextChange={(text) => setOtp(text)}
        onFilled={(text) => verifyOtp(text)}
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
        <Btn title='Verify OTP' onPress={() => verifyOtp(otp)} />
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
