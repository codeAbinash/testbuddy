import api from '@/api/api'
import { GoogleIcon, SmartPhone01StrokeRoundedIcon } from '@assets/icons/icons'
import Btn, { BtnTransparent } from '@components/Button'
import Input, { InputIcon } from '@components/Input'
import Label from '@components/Label'
import { PaddingBottom, PaddingTop } from '@components/SafePadding'
import LoginImage from '@images/login.svg'
import { useMutation } from '@tanstack/react-query'
import { W } from '@utils/dimensions'
import { Bold, Medium, SemiBold } from '@utils/fonts'
import React, { useState } from 'react'
import { Alert, View } from 'react-native'

export default function Login() {
  const [mobile, setMobile] = useState('')

  const { mutate, isPending } = useMutation({
    mutationKey: ['sendOtp'],
    mutationFn: api.sendOtp,
    onSuccess: (data) => {
      console.log(data)
    },
  })

  const handelPress = () => {
    if (!mobile) return Alert.alert('Mobile number is required', 'Please enter your mobile number')
    console.log(mobile)
    mutate({ mobile })
  }

  return (
    <>
      <PaddingTop />
      <View className='h-screen flex-1 justify-between gap-10 px-5'>
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
                value={mobile}
                onChangeText={setMobile}
                keyboardType='phone-pad'
              />
            </View>
            <Btn title={isPending ? 'Sending OTP...' : 'Send OTP'} onPress={handelPress} disabled={isPending} />
          </View>
          <View className='flex-row items-center justify-center gap-3'>
            <View className='h-0.5 w-1/3 bg-zinc-300' />
            <Medium className='text text-center text-xs opacity-80'>Or</Medium>
            <View className='h-0.5 w-1/3 bg-zinc-300' />
          </View>
          <BtnTransparent
            children={
              <View className='flex-row items-center justify-center gap-5'>
                <GoogleIcon height={23} width={23} />
                <Medium style={{ fontSize: 12.4 }} className='text-center text-xs text-zinc-900 dark:text-zinc-100'>
                  Continue with Google
                </Medium>
              </View>
            }
          />
        </View>
        <View />
        <View>
          <SemiBold className='text mb-2 mt-2 text-center text-[0.65rem]'>
            By continuing, you agree to our <SemiBold className='text-blue-500'>Terms of Service</SemiBold> and{' '}
            <SemiBold className='text-blue-500'>Privacy Policy</SemiBold>.
          </SemiBold>
        </View>
      </View>
      <PaddingBottom />
    </>
  )
}
