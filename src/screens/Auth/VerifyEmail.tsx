import { networkError, networkErrorMessage } from '@/constants'
import authStore from '@/zustand/authStore'
import popupStore from '@/zustand/popupStore'
import Animations from '@assets/animations/animations'
import Btn from '@components/Button'
import { KeyboardAvoid } from '@components/KeyboardAvoidingContainer'
import { Lottie } from '@components/Lottie'
import api from '@query/api'
import type { RouteProp } from '@react-navigation/native'
import { useMutation } from '@tanstack/react-query'
import { W } from '@utils/dimensions'
import { Bold, JosefinSansSemiBold, Medium, SemiBold } from '@utils/fonts'
import type { StackNav } from '@utils/types'
import { useColorScheme } from 'nativewind'
import { useState } from 'react'
import { StyleSheet, ToastAndroid, View } from 'react-native'
import { OtpInput } from 'react-native-otp-entry'
import colors from 'tailwindcss/colors'
import { normalizePhoneNumber } from './utils'

type ParamList = {
  VerifyEmail: VerifyEmailParamList
}

export type VerifyEmailParamList = {
  email: string
}

type VerifyEmailProps = {
  navigation: StackNav
  route: RouteProp<ParamList, 'VerifyEmail'>
}

export default function VerifyEmail({ route, navigation }: VerifyEmailProps) {
  const [otp, setOtp] = useState('')
  const [errorMessages, setErrorMessages] = useState('')
  const { email } = route.params
  const alert = popupStore((store) => store.alert)
  const { colorScheme } = useColorScheme()
  const setToken = authStore((store) => store.setToken)
  const { mutate, isPending } = useMutation({
    mutationKey: ['verifyOtp', email, otp],
    mutationFn: api.verifyOtp,
    onSuccess(data) {
      if (!data) return alert(networkError, networkErrorMessage)
      // if (data.isAlert) return alert('Error', data.message || 'Failed to send OTP. Please try again.')
      // if (!data.verified)
      //   return alert('Wrong OTP', data.message || 'Please enter the correct OTP sent to your mobile number.')
      if (data.isAlert || !data.verified)
        return setErrorMessages(data.message || 'Please enter the correct OTP sent to your mobile number.')
      if (data.token) setToken(data.token)
      if (data.newUser === true)
        return navigation.reset({ index: 0, routes: [{ name: 'Register', params: { mobile: email } }] })
      navigation.reset({ index: 0, routes: [{ name: 'HomeDrawer' }] })
    },
  })

  const { mutate: resendOtp } = useMutation({
    mutationKey: ['resendOtp', email],
    mutationFn: api.sendOtp,
    onSuccess(data) {
      if (!data) return alert('Error', 'There was an error sending the OTP. Please try again.')
      alert('OTP Sent', `We have sent a new OTP to your mobile number ${email}.`)
    },
  })

  const verifyOtp = (otp: string) => {
    if (!otp) return alert('OTP is required', 'Please enter the OTP sent to your mobile number.')
    if (otp.length !== 4) return alert('Invalid OTP', 'Please enter a valid OTP. It should be 4 digits long.')
    mutate({ mobile: normalizePhoneNumber(email), otp })
  }

  function handleResend() {
    alert(
      'Resend OTP',
      `Please wait. The mobile number is ${email}. If incorrect, update it. Otherwise, click Resend.`,
      [
        { text: 'Cancel' },
        {
          text: 'Resend',
          onPress() {
            ToastAndroid.show('Resending OTP...', ToastAndroid.SHORT)
            resendOtp({ mobile: normalizePhoneNumber(email) })
          },
        },
      ],
    )
  }

  return (
    <KeyboardAvoid>
      <View className='h-screen flex-1 justify-between px-7'>
        <View>
          <Lottie source={Animations.message} speed={0.7} size={W * 0.75} />
          <View className='gap-3'>
            <Bold className='text w-full text-center text-3xl'>Verify Email</Bold>
            <Medium className='text w-full text-center text-sm opacity-80'>
              We have sent a verification code to {'\n'} {email}{' '}
              <SemiBold className='link' onPress={navigation.goBack}>
                change?
              </SemiBold>
            </Medium>
          </View>
        </View>
        <View>
          <OtpInput
            numberOfDigits={4}
            focusColor={colorScheme === 'dark' ? colors.zinc[300] : colors.zinc[700]}
            focusStickBlinkingDuration={500}
            blurOnFilled
            hideStick
            onTextChange={(text) => {
              setOtp(text)
              setErrorMessages('')
            }}
            onFilled={(text) => verifyOtp(text)}
            textInputProps={{
              accessibilityLabel: 'One-Time Password',
              selectionColor: 'transparent',
              caretHidden: true,
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

          <Medium className='mt-5 text-center text-sm text-red-500'>{errorMessages}</Medium>
        </View>
        <View className='gap-8'>
          <Btn
            title={isPending ? 'Verifying...' : 'Verify Email'}
            onPress={() => verifyOtp(otp)}
            disabled={isPending}
          />
          <Medium className='text w-full text-center text-sm opacity-80'>
            Didn't receive the code?{' '}
            <SemiBold className='link' onPress={handleResend}>
              Resend
            </SemiBold>
          </Medium>
        </View>
        <View />
      </View>
    </KeyboardAvoid>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
})
