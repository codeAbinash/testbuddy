import popupStore from '@/zustand/popupStore'
import {
  BirthdayCakeStrokeRoundedIcon,
  CheckmarkBadge01StrokeRoundedIcon,
  Mail02StrokeRoundedIcon,
  PhysicsStrokeRoundedIcon,
  SmartPhone01StrokeRoundedIcon,
  StudentsStrokeRoundedIcon,
  UserStrokeRoundedIcon,
} from '@assets/icons/icons'
import Btn from '@components/Button'
import DropdownExtended from '@components/DropdownExtended'
import Input, { InputIcon, TouchableInput } from '@components/Input'
import { KeyboardAvoid } from '@components/KeyboardAvoid'
import Label from '@components/Label'
import { Loading } from '@components/Loading'
import Press from '@components/Press'
import { PaddingBottom } from '@components/SafePadding'
import api from '@query/api/api'
import { queryClient } from '@query/query'
import { DateTimePickerAndroid, DateTimePickerEvent } from '@react-native-community/datetimepicker'
import BackHeader from '@screens/components/BackHeader'
import { Std, Stream } from '@screens/utils'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Medium } from '@utils/fonts'
import type { NavProps } from '@utils/types'
import { toLocalDateString } from '@utils/utils'
import { useColorScheme } from 'nativewind'
import { useEffect, useState } from 'react'
import { Pressable, ToastAndroid, View } from 'react-native'
import colors from 'tailwindcss/colors'
import { LocationSelector } from './components/LocationSelector'
import ProfilePicture from './components/ProfilePicture'

export default function EditProfile({ navigation }: NavProps) {
  const [fName, setFName] = useState('')
  const [std, setStd] = useState('')
  const [stream, setStream] = useState('')
  const [email, setEmail] = useState('')
  const [mobile, setMobile] = useState('')
  const [dob, setDob] = useState<Date>()
  const [state, setState] = useState('')
  const [city, setCity] = useState('')
  const { colorScheme } = useColorScheme()

  const alert = popupStore((store) => store.alert)

  const { data: profile, isPending } = useQuery({ queryKey: ['profile'], queryFn: api.profile })
  const { mutate: updateProfile, isPending: isUpdating } = useMutation({
    mutationKey: ['updateProfile'],
    mutationFn: api.updateProfile,
    onSuccess(data) {
      if (!data) return alert('Failed', 'Failed to update profile. Please try again.')
      if (data.isAlert) return alert('Failed', data.message || 'Failed to update profile. Please try again.')
      if (!data.name) return alert('Failed', data.message || 'Something went wrong. Please try again.')
      ToastAndroid.show('Profile updated successfully', ToastAndroid.SHORT)
      navigation.goBack()
      queryClient.invalidateQueries({
        queryKey: ['profile'],
      })
    },
  })

  function handleSubmit() {
    const finalName = fName.trim()
    const finalEmail = email.trim()
    if (!finalName) return alert('Invalid Input', 'Please enter your name')
    if (finalName.length < 3) return alert('Invalid Input', 'Name should be at least 3 characters long')
    if (!std) return alert('Invalid Input', 'Please select your standard')
    if (!stream) return alert('Invalid Input', 'Please select your stream')
    // if (!finalEmail) return alert('Invalid Input', 'Please enter your email')
    if (finalEmail && !/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(finalEmail))
      return alert('Invalid Input', 'Please enter a valid email')

    const updateObj: Parameters<typeof api.updateProfile>[0] = { name: finalName, std, stream }
    if (finalEmail) updateObj.email = finalEmail
    if (state) updateObj.state = state
    if (city) updateObj.city = city
    if (dob) updateObj.birthday = dob.toISOString()
    updateProfile(updateObj)
  }

  useEffect(() => {
    if (profile) {
      setMobile(profile.mobile || '')
      setFName(profile.name || '')
      setStd(profile.std || '')
      setStream(profile.stream || '')
      setEmail(profile.email || '')
      setState(profile.state || '')
      setCity(profile.city || '')
      setDob(profile.birthday ? new Date(profile.birthday) : undefined)
    }
  }, [profile])

  function handleDateSelect() {
    DateTimePickerAndroid.open({
      value: dob || new Date(),
      mode: 'date',
      display: 'default',
      onChange: handleDateChange,
    })
  }
  function handleDateChange(_event: DateTimePickerEvent, selectedDate?: Date) {
    if (selectedDate) {
      setDob(selectedDate)
    }
  }

  return (
    <>
      <BackHeader title='Edit Profile' navigation={navigation} />
      {isPending ? (
        <Loading />
      ) : (
        <KeyboardAvoid>
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
                  Right={
                    <InputIcon Icon={CheckmarkBadge01StrokeRoundedIcon} iconProps={{ color: colors.green[500] }} />
                  }
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
                  Right={<EmailRightComponent profile={profile} email={email} />}
                />
              </View>
              <View>
                <Label text='Date of Birth' />
                <TouchableInput
                  Left={<InputIcon Icon={BirthdayCakeStrokeRoundedIcon} />}
                  placeholder='e.g. 01/01/2000'
                  value={dob ? toLocalDateString(dob) : ''}
                  onPress={handleDateSelect}
                />
              </View>
              <LocationSelector
                state={state}
                setState={setState}
                city={city}
                setCity={setCity}
                colorScheme={colorScheme}
              />

              <View className='mt-5'>
                <Btn
                  title={isUpdating ? 'Updating...' : 'Update Profile'}
                  onPress={handleSubmit}
                  disabled={isUpdating}
                />
              </View>
            </View>
            <PaddingBottom />
          </View>
        </KeyboardAvoid>
      )}
    </>
  )
}

type EmailRightComponentProps = {
  profile: Awaited<ReturnType<typeof api.profile>> | undefined
  email: string
}

function EmailRightComponent({ profile, email }: EmailRightComponentProps) {
  const { mutate } = useMutation({ mutationKey: ['sendOtp', email], mutationFn: api.sendEmailOtp })

  function sendEmailOtp() {
    const e = email.trim()
    if (!e) return ToastAndroid.show('Please enter a valid email', ToastAndroid.SHORT)
    mutate({ email: e })
  }

  return profile?.emailVerified ? (
    <InputIcon Icon={CheckmarkBadge01StrokeRoundedIcon} iconProps={{ color: colors.green[500] }} />
  ) : (
    <Press onPress={sendEmailOtp}>
      <Medium className='text-sm text-orange-500'>Verify</Medium>
    </Press>
  )
}
