import { networkError, networkErrorMessage } from '@/constants'
import popupStore from '@/zustand/popupStore'
import {
  Mail02StrokeRoundedIcon,
  PhysicsStrokeRoundedIcon,
  Share02StrokeRoundedIcon,
  SmartPhone01StrokeRoundedIcon,
  StudentsStrokeRoundedIcon,
  UserStrokeRoundedIcon,
} from '@assets/icons/icons'
import Btn from '@components/Button'
import DropdownExtended from '@components/DropdownExtended'
import Input, { InputIcon } from '@components/Input'
import { KeyboardAvoid } from '@components/KeyboardAvoid'
import Label from '@components/Label'
import api from '@query/api/api'
import type { RouteProp } from '@react-navigation/native'
import TermsAndConditions from '@screens/components/TermsAndConditions'
import { Std, Stream } from '@screens/utils'
import { useMutation } from '@tanstack/react-query'
import { Bold, Medium, SemiBold } from '@utils/fonts'
import type { StackNav } from '@utils/types'
import { useColorScheme } from 'nativewind'
import { useState } from 'react'
import { Pressable, ToastAndroid, View } from 'react-native'
import { logout } from './utils'

type ParamList = {
  Register: RegisterParamList
}

export type RegisterParamList = {
  mobile: string
}

type RegisterProps = {
  route: RouteProp<ParamList, 'Register'>
  navigation: StackNav
}

export default function Register({ navigation, route }: RegisterProps) {
  const { colorScheme } = useColorScheme()
  const { mobile } = route.params
  const { alert } = popupStore()

  const { mutate, isPending } = useMutation({
    mutationKey: ['updateProfile'],
    mutationFn: api.updateProfile,
    onSuccess: (data) => {
      if (!data) return alert(networkError, `Network error: ${networkErrorMessage}`)
      if (data.isAlert) return alert('Failed', data.message || 'Failed to update profile. Please try again.')
      if (!data.name) return alert('Failed', `Error: ${data.message || 'Something went wrong. Please try again.'}`)
      ToastAndroid.show('Profile updated successfully', ToastAndroid.SHORT)
      navigation.reset({ index: 0, routes: [{ name: 'HomeDrawer' }] })
    },
  })

  const [fName, setFName] = useState('')
  const [std, setStd] = useState('')
  const [stream, setStream] = useState('')
  const [email, setEmail] = useState('')
  const [referral, setReferral] = useState('')

  function handleSubmit() {
    const finalName = fName.trim()
    const finalEmail = email.trim()
    const finalReferral = referral.trim()
    if (!finalName) return alert('Invalid Input', 'Please enter your name')
    if (finalName.length < 3) return alert('Invalid Input', 'Name should be at least 3 characters long')
    if (!std) return alert('Invalid Input', 'Please select your standard')
    if (!stream) return alert('Invalid Input', 'Please select your stream')
    if (!finalEmail) return alert('Invalid Input', 'Please enter your email')
    if (!/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(finalEmail))
      return alert('Invalid Input', 'Please enter a valid email')

    mutate({ name: finalName, email: finalEmail, std, stream, referralKey: finalReferral })
  }

  return (
    <KeyboardAvoid>
      <View className='min-h-screen flex-1 gap-10 p-5 dark:bg-black'>
        {/* <View className='items-center justify-center'>
          <RegisterImage width={W * 0.8} height={W * 0.8} />
        </View> */}
        <View className='mb-5 mt-8'>
          <Bold className='text w-full text-center text-3xl'>Welcome to TestBuddy</Bold>
          <SemiBold className='text w-full text-center text-sm opacity-80'>
            Please enter your mobile number and name to continue
          </SemiBold>
        </View>
        <View>
          <View className='gap-3'>
            <Pressable onPress={() => ToastAndroid.show('Mobile number cannot be changed', ToastAndroid.SHORT)}>
              <Label text='Mobile Number' />
              <Input
                Left={<InputIcon Icon={SmartPhone01StrokeRoundedIcon} />}
                placeholder='e.g. 9876543210'
                keyboardType='phone-pad'
                autoComplete='tel'
                value={mobile}
                editable={false}
                className='text opacity-70'
              />
            </Pressable>
            <View>
              <Label text='Full Name' />
              <Input
                Left={<InputIcon Icon={UserStrokeRoundedIcon} />}
                placeholder='e.g. John Doe'
                autoComplete='name'
                value={fName}
                onChangeText={setFName}
              />
            </View>
            <View>
              <Label text='Std' />
              <DropdownExtended
                Left={<InputIcon Icon={StudentsStrokeRoundedIcon} />}
                placeholder='e.g. 11th or 12th or Dropper'
                data={Std}
                maxHeight={150}
                labelField='label'
                valueField='value'
                value={std}
                onChange={(item) => setStd(item.value)}
                colorScheme={colorScheme}
              />
            </View>
            <View>
              <Label text='Stream' />
              <DropdownExtended
                Left={<InputIcon Icon={PhysicsStrokeRoundedIcon} />}
                placeholder='e.g. Engineering or Medical'
                data={Stream}
                labelField='label'
                valueField='value'
                value={stream}
                onChange={(item) => setStream(item.value)}
                colorScheme={colorScheme}
              />
            </View>
            <View>
              <Label text='Email' />
              <Input
                Left={<InputIcon Icon={Mail02StrokeRoundedIcon} />}
                placeholder='e.g. example@example.com'
                keyboardType='email-address'
                autoComplete='email'
                value={email}
                onChangeText={setEmail}
              />
            </View>
            <View>
              <Label text='Referral Code' />
              <Input
                Left={<InputIcon Icon={Share02StrokeRoundedIcon} />}
                placeholder='e.g. D4P98A'
                value={referral}
                onChangeText={setReferral}
              />
            </View>
          </View>
        </View>
        <View className='gap-3'>
          <Btn title={isPending ? 'Loading...' : 'Continue'} onPress={handleSubmit} disabled={isPending} />
          <TermsAndConditions />
          {__DEV__ && (
            <Medium className='link text-center text-xs' onPress={logout}>
              Log out
            </Medium>
          )}
        </View>
      </View>
    </KeyboardAvoid>
  )
}
