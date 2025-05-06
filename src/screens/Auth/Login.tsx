import { networkError, networkErrorMessage } from '@/constants'
import popupStore from '@/zustand/popupStore'
import { GoogleIcon, SmartPhone01StrokeRoundedIcon } from '@assets/icons/icons'
import Btn, { BtnTransparent } from '@components/Button'
import Input, { InputIcon } from '@components/Input'
import { KeyboardAvoid } from '@components/KeyboardAvoid'
import Label from '@components/Label'
import LoginImage from '@images/login.svg'
import api from '@query/api/api'
import TermsAndConditions from '@screens/components/TermsAndConditions'
import { useMutation } from '@tanstack/react-query'
import { W } from '@utils/dimensions'
import { Bold, Medium, SemiBold } from '@utils/fonts'
import type { NavProps } from '@utils/types'
import { useState } from 'react'
import { View, ActivityIndicator } from 'react-native'
import { normalizePhoneNumber } from './utils'
import { handleGoogleLogin } from './googleLogin'

export default function Login({ navigation }: NavProps) {
  const [mobile, setMobile] = useState('')
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const alert = popupStore((store) => store.alert)

  const { mutate, isPending } = useMutation({
    mutationKey: ['sendOtp'],
    mutationFn: api.sendOtp,
    onSuccess: (data) => {
      if (!data) return alert(networkError, networkErrorMessage)
      if (data.isAlert) return alert('Failed', data.message || 'Failed to send OTP. Please try again.')
      if (!data?.otpSent) return alert('Failed', data?.message || 'Failed to send OTP. Please try again.')
      navigation.navigate('VerifyOtp', { mobile })
    },
  })

  const handlePress = () => {
    if (!mobile) return alert('Mobile number is required', 'Please enter your mobile number.')
    mutate({ mobile: normalizePhoneNumber(mobile) })
  }

  const handleGoogleSignIn = async () => {
    try {
      setIsGoogleLoading(true)
      await handleGoogleLogin()
    } catch (error) {
      console.error('Google sign-in error:', error)
      alert('Login Failed', 'Could not log in with Google. Please try again later.')
    } finally {
      setIsGoogleLoading(false)
    }
  }

  return (
    <KeyboardAvoid>
      <View className='h-screen flex-1 justify-between gap-10 bg-white px-5 dark:bg-black'>
        <View />
        <View>
          <View className='items-center justify-center'>
            <LoginImage width={W * 0.8} height={W * 0.8} />
          </View>
        </View>
        <View>
          <Bold className='text w-full text-center text-3xl'>Welcome to TestBuddy</Bold>
          <SemiBold className='text w-full text-center text-sm opacity-80'>
            Ultimate Destination for All Your Practice!
          </SemiBold>
        </View>
        <View className='gap-7'>
          <View className='gap-5'>
            <View>
              <Label text='Mobile Number' />
              <Input
                Left={<InputIcon Icon={SmartPhone01StrokeRoundedIcon} />}
                placeholder='e.g. 9876543210'
                value={mobile}
                onChangeText={setMobile}
                keyboardType='phone-pad'
                autoComplete='tel'
              />
            </View>
            <Btn title={isPending ? 'Sending OTP...' : 'Send OTP'} onPress={handlePress} disabled={isPending} />
          </View>
          <View className='flex-row items-center justify-center gap-3'>
            <View className='w-2/5 rounded-full bg-zinc-200 dark:bg-zinc-800' style={{ height: 1.5 }} />
            <Medium className='text text-center text-xs opacity-80'>or</Medium>
            <View className='w-2/5 rounded-full bg-zinc-200 dark:bg-zinc-800' style={{ height: 1.5 }} />
          </View>
          <BtnTransparent onPress={handleGoogleSignIn} disabled={isGoogleLoading}>
            <View className='flex-row items-center justify-center gap-5'>
              {isGoogleLoading ? (
                <ActivityIndicator size='small' color='#4285F4' />
              ) : (
                <GoogleIcon height={22} width={22} />
              )}
              <Medium style={{ fontSize: 12.4 }} className='text-center text-xs text-zinc-900 dark:text-zinc-100'>
                {isGoogleLoading ? 'Signing in with Google...' : 'Continue with Google'}
              </Medium>
            </View>
          </BtnTransparent>
          <TermsAndConditions />
        </View>
        <View />
      </View>
    </KeyboardAvoid>
  )
}
