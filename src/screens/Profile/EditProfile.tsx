import {
  BirthdayCakeStrokeRoundedIcon,
  CheckmarkBadge01StrokeRoundedIcon,
  City03StrokeRoundedIcon,
  Mail02StrokeRoundedIcon,
  MapsLocation01StrokeRoundedIcon,
  PhysicsStrokeRoundedIcon,
  Share02StrokeRoundedIcon,
  SmartPhone01StrokeRoundedIcon,
  StudentsStrokeRoundedIcon,
  UserStrokeRoundedIcon,
} from '@assets/icons/icons'
import Btn from '@components/Button'
import DropdownExtended from '@components/DropdownExtended'
import Input, { InputIcon } from '@components/Input'
import { KeyboardAvoidWithoutPadding } from '@components/KeyboardAvoidingContainer'
import Label from '@components/Label'
import Press from '@components/Press'
import { PaddingBottom } from '@components/SafePadding'
import api from '@query/api'
import BackHeader from '@screens/BackHeader'
import { Std, Stream } from '@screens/utils'
import { useQuery } from '@tanstack/react-query'
import { Medium } from '@utils/fonts'
import type { NavProps } from '@utils/types'
import { useColorScheme } from 'nativewind'
import { useState } from 'react'
import { Pressable, ToastAndroid, View } from 'react-native'
import colors from 'tailwindcss/colors'
import ProfilePicture from './components/ProfilePicture'

export default function EditProfile({ navigation }: NavProps) {
  const { colorScheme } = useColorScheme()

  const [mobile, setMobile] = useState(__DEV__ ? '9876543210' : '')
  const [fName, setFName] = useState(__DEV__ ? 'John Doe' : '')
  const [std, setStd] = useState(__DEV__ ? '11th' : '')
  const [stream, setStream] = useState(__DEV__ ? 'engineering' : '')
  const [email, setEmail] = useState(__DEV__ ? 'codeAbinash@gmail.com' : '')
  const [referral, setReferral] = useState('')
  const [dob, setDob] = useState('')
  const [state, setState] = useState('')
  const [city, setCity] = useState('')
  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: api.profile,
  })

  return (
    <>
      <BackHeader title='Edit Profile' navigation={navigation} />
      <KeyboardAvoidWithoutPadding>
        <View className='screen-bg flex-1 gap-5 px-5 py-3'>
          <ProfilePicture picture={profile?.profilePic} scheme={colorScheme} />
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
                Right={<InputIcon Icon={CheckmarkBadge01StrokeRoundedIcon} iconProps={{ color: colors.green[500] }} />}
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
                Right={
                  profile?.emailVerified ? (
                    <InputIcon Icon={CheckmarkBadge01StrokeRoundedIcon} iconProps={{ color: colors.green[500] }} />
                  ) : (
                    <Press onPress={() => ToastAndroid.show('Email verification link sent', ToastAndroid.SHORT)}>
                      <Medium className='text-sm text-orange-500'>Verify</Medium>
                    </Press>
                  )
                }
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
            <View>
              <Label text='Date of Birth' />
              <Input Left={<InputIcon Icon={BirthdayCakeStrokeRoundedIcon} />} placeholder='e.g. 01/01/2000' />
            </View>

            <View>
              <Label text='State' />
              <DropdownExtended
                Left={<InputIcon Icon={MapsLocation01StrokeRoundedIcon} />}
                placeholder='e.g. Maharashtra or West Bengal'
                data={Stream}
                labelField='label'
                valueField='value'
                value={state}
                onChange={(item) => setState(item.value)}
                colorScheme={colorScheme}
              />
            </View>
            <View>
              <Label text='City' />
              <DropdownExtended
                Left={<InputIcon Icon={City03StrokeRoundedIcon} />}
                placeholder='e.g. Mumbai or Kolkata'
                data={Stream}
                labelField='label'
                valueField='value'
                value={city}
                onChange={(item) => setCity(item.value)}
                colorScheme={colorScheme}
              />
            </View>
            <View className='mt-5'>
              <Btn title='Update Profile' />
            </View>
          </View>
          <PaddingBottom />
        </View>
      </KeyboardAvoidWithoutPadding>
    </>
  )
}
