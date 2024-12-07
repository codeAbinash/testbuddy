import api from '@/api'
import popupStore from '@/zustand/popupStore'
import { GoogleIcon, SmartPhone01StrokeRoundedIcon } from '@assets/icons/icons'
import Btn, { BtnTransparent } from '@components/Button'
import Input, { InputIcon } from '@components/Input'
import { KeyboardAvoid } from '@components/KeyboardAvoidingContainer'
import Label from '@components/Label'
import LoginImage from '@images/login.svg'
import { useMutation } from '@tanstack/react-query'
import { W } from '@utils/dimensions'
import { Bold, Medium, SemiBold } from '@utils/fonts'
import type { NavProps } from '@utils/types'
import React, { useState } from 'react'
import { View } from 'react-native'
import { normalizePhoneNumber } from './utils'

export default function Login({ navigation }: NavProps) {
  const [mobile, setMobile] = useState('')
  const alert = popupStore((store) => store.alert)

  const { mutate, isPending } = useMutation({
    mutationKey: ['sendOtp'],
    mutationFn: api.sendOtp,
    onSuccess: (data) => {
      console.log(data)
      if (!data?.otpSent) return alert('Error', data?.message || 'Failed to send OTP. Please try again.')
      // if (data.newUser) return navigation.reset({ index: 0, routes: [{ name: 'Register', params: { mobile } }] })
      navigation.navigate('VerifyOtp', { mobile })
    },
  })

  const handlePress = () => {
    if (!mobile) return alert('Mobile number is required', 'Please enter your mobile number.')
    console.log(mobile)
    mutate({ mobile: normalizePhoneNumber(mobile) })
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
                placeholder='Mobile Number'
                autoComplete='tel'
                value={mobile}
                onChangeText={setMobile}
                keyboardType='phone-pad'
              />
            </View>
            <Btn title={isPending ? 'Sending OTP...' : 'Send OTP'} onPress={handlePress} disabled={isPending} />
          </View>
          <View className='flex-row items-center justify-center gap-3'>
            <View className='w-2/5 rounded-full bg-zinc-200 dark:bg-zinc-800' style={{ height: 1.5 }} />
            <Medium className='text text-center text-xs opacity-80'>or</Medium>
            <View className='w-2/5 rounded-full bg-zinc-200 dark:bg-zinc-800' style={{ height: 1.5 }} />
          </View>
          <BtnTransparent
            children={
              <View className='flex-row items-center justify-center gap-5'>
                <GoogleIcon height={22} width={22} />
                <Medium style={{ fontSize: 12.4 }} className='text-center text-xs text-zinc-900 dark:text-zinc-100'>
                  Continue with Google
                </Medium>
              </View>
            }
          />
          <View>
            <SemiBold className='text mb-2 mt-2 text-center text-[0.65rem]'>
              By continuing, you agree to our <SemiBold className='text-blue-500'>Terms of Service</SemiBold> and{' '}
              <SemiBold className='text-blue-500'>Privacy Policy</SemiBold>.
            </SemiBold>
          </View>
        </View>
        <View />
      </View>
    </KeyboardAvoid>
  )
}
