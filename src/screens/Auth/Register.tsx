import {
  AmbulanceStrokeRoundedIcon,
  BookOpen01StrokeRoundedIcon,
  Mail02StrokeRoundedIcon,
  Mortarboard01StrokeRoundedIcon,
  Mortarboard02StrokeRoundedIcon,
  PhysicsStrokeRoundedIcon,
  Share02StrokeRoundedIcon,
  SmartPhone01StrokeRoundedIcon,
  StudentsStrokeRoundedIcon,
  UserStrokeRoundedIcon,
  WindPowerStrokeRoundedIcon,
} from '@assets/icons/icons'
import Btn from '@components/Button'
import DropdownExtended, { type DropdownData } from '@components/DropdownExtendex'
import Input, { InputIcon } from '@components/Input'
import { KeyboardAvoid } from '@components/KeyboardAvoidingContainer'
import Label from '@components/Label'
import type { RouteProp } from '@react-navigation/native'
import TermsAndConditions from '@screens/components/TermsAndConditions'
import { Bold, Medium, SemiBold } from '@utils/fonts'
import type { StackNav } from '@utils/types'
import { useColorScheme } from 'nativewind'
import { useState } from 'react'
import { View } from 'react-native'
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

const Stream: DropdownData[] = [
  { label: 'Engineering', value: 'engineering', Icon: WindPowerStrokeRoundedIcon },
  { label: 'Medical', value: 'medical', Icon: AmbulanceStrokeRoundedIcon },
]
const Std: DropdownData[] = [
  { label: '11th', value: '11th', Icon: Mortarboard02StrokeRoundedIcon },
  { label: '12th', value: '12th', Icon: Mortarboard01StrokeRoundedIcon },
  { label: 'Dropper', value: 'dropper', Icon: BookOpen01StrokeRoundedIcon },
]

export default function Register({ navigation, route }: RegisterProps) {
  const { colorScheme } = useColorScheme()
  const { mobile } = route.params

  const [fName, setFName] = useState('')
  const [std, setStd] = useState('')
  const [stream, setStream] = useState('')
  const [email, setEmail] = useState('')
  const [referral, setReferral] = useState('')

  function handleSubmit() {
    console.log(fName, std, stream, email, referral)
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
            <View>
              <Label text='Mobile Number' />
              <Input
                Left={<InputIcon Icon={SmartPhone01StrokeRoundedIcon} />}
                placeholder='e.g. 9876543210'
                keyboardType='phone-pad'
                autoComplete='tel'
                value={mobile}
                editable={false}
                className='text opacity-90'
              />
            </View>
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
          <Btn title={'Continue'} onPress={handleSubmit} />
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
