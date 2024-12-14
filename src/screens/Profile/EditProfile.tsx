import popupStore from '@/zustand/popupStore'
import {
  BirthdayCakeStrokeRoundedIcon,
  CheckmarkBadge01StrokeRoundedIcon,
  City03StrokeRoundedIcon,
  Mail02StrokeRoundedIcon,
  MapsLocation01StrokeRoundedIcon,
  PhysicsStrokeRoundedIcon,
  SmartPhone01StrokeRoundedIcon,
  StudentsStrokeRoundedIcon,
  UserStrokeRoundedIcon,
} from '@assets/icons/icons'
import Btn from '@components/Button'
import DropdownExtended, { DropdownData } from '@components/DropdownExtended'
import Input, { InputIcon } from '@components/Input'
import { KeyboardAvoidWithoutPadding } from '@components/KeyboardAvoidingContainer'
import Label from '@components/Label'
import { Loading } from '@components/Loading'
import Press from '@components/Press'
import { PaddingBottom } from '@components/SafePadding'
import api from '@query/api'
import { citySearch, queryClient } from '@query/index'
import BackHeader from '@screens/BackHeader'
import { Std, Stream } from '@screens/utils'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Medium } from '@utils/fonts'
import type { ColorScheme, NavProps } from '@utils/types'
import { useColorScheme } from 'nativewind'
import { useEffect, useState } from 'react'
import { Pressable, ToastAndroid, View } from 'react-native'
import colors from 'tailwindcss/colors'
import ProfilePicture from './components/ProfilePicture'

async function searchAllStates() {
  const cities = (await (await citySearch.get('states/India')).data) as ({ state_name: string } & DropdownData)[]
  for (const city of cities) {
    city.label = city.state_name
    city.value = city.state_name
  }
  return cities
}

async function searchCity(state: string) {
  const cities = await (await citySearch.get(`cities/${state}`)).data
  for (const city of cities) {
    city.label = city.city_name
    city.value = city.city_name
  }
  return cities
}

export default function EditProfile({ navigation }: NavProps) {
  const { colorScheme } = useColorScheme()
  const alert = popupStore((store) => store.alert)

  const [fName, setFName] = useState('')
  const [std, setStd] = useState('')
  const [stream, setStream] = useState('')
  const [email, setEmail] = useState('')
  const [mobile, setMobile] = useState('')
  const [dob, setDob] = useState('')
  const [state, setState] = useState('')
  const [city, setCity] = useState('')

  const { data: profile, isPending } = useQuery({ queryKey: ['profile'], queryFn: api.profile })
  const { mutate: sendEmailOtp } = useMutation({ mutationKey: ['sendOtp', mobile], mutationFn: api.sendEmailOtp })
  const { mutate: updateProfile, isPending: isUpdating } = useMutation({
    mutationKey: ['sendOtp', mobile],
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

  function handleSendOtp() {
    const e = email.trim()
    if (!e) return ToastAndroid.show('Please enter a valid email', ToastAndroid.SHORT)
    sendEmailOtp({ email: e })
  }

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
    }
  }, [profile])

  return (
    <>
      <BackHeader title='Edit Profile' navigation={navigation} />
      {isPending ? (
        <Loading colorScheme={colorScheme} />
      ) : (
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
                  Right={
                    profile?.emailVerified ? (
                      <InputIcon Icon={CheckmarkBadge01StrokeRoundedIcon} iconProps={{ color: colors.green[500] }} />
                    ) : (
                      <Press onPress={handleSendOtp}>
                        <Medium className='text-sm text-orange-500'>Verify</Medium>
                      </Press>
                    )
                  }
                />
              </View>
              <View>
                <Label text='Date of Birth' />
                <Input Left={<InputIcon Icon={BirthdayCakeStrokeRoundedIcon} />} placeholder='e.g. 01/01/2000' />
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
        </KeyboardAvoidWithoutPadding>
      )}
    </>
  )
}

type LocationSelectorProps = {
  state: string
  setState: (state: string) => void
  city: string
  setCity: (city: string) => void
  colorScheme: ColorScheme
}

function LocationSelector({ state, setState, city, setCity, colorScheme }: LocationSelectorProps) {
  const [cities, setCities] = useState<DropdownData[]>([])

  const { data: states } = useQuery({ queryKey: ['states'], queryFn: searchAllStates })

  useEffect(() => {
    if (state) {
      console.log('searching city', state)
      searchCity(state).then((data) => {
        setCities(data)
      })
    }
  }, [state])
  return (
    <>
      <View>
        <Label text='State' />
        <DropdownExtended
          Left={<InputIcon Icon={MapsLocation01StrokeRoundedIcon} />}
          placeholder='e.g. Maharashtra or West Bengal'
          data={states || []}
          labelField='label'
          valueField='value'
          value={state}
          // maxHeight={400}
          onChange={(item) => setState(item.value)}
          colorScheme={colorScheme}
          search
          // dropdownPosition='top'
          mode='modal'
          autoScroll={false}
          renderItem={StateRenderItem}
        />
      </View>
      <View>
        <Label text='City' />
        <DropdownExtended
          Left={<InputIcon Icon={City03StrokeRoundedIcon} />}
          placeholder='e.g. Mumbai or Kolkata'
          data={cities}
          maxHeight={400}
          labelField='label'
          autoScroll={false}
          valueField='value'
          // dropdownPosition='top'
          search
          value={city}
          onChange={(item) => setCity(item.value)}
          colorScheme={colorScheme}
          mode='modal'
          renderItem={CityRenderItem}
        />
      </View>
    </>
  )
}


function StateRenderItem<T extends DropdownData>(item: T) {
  return (
    <View className='flex-row items-center gap-3 px-5' style={{ borderRadius: 14.5, height: 49.5 }}>
      <InputIcon  Icon={MapsLocation01StrokeRoundedIcon}/>
      <Medium className='text text-base'>{item.label}</Medium>
    </View>
  )
}

function CityRenderItem<T extends DropdownData>(item: T) {
  return (
    <View className='flex-row items-center gap-3 px-5' style={{ borderRadius: 14.5, height: 49.5 }}>
      <InputIcon  Icon={City03StrokeRoundedIcon}/>
      <Medium className='text text-base'>{item.label}</Medium>
    </View>
  )
}