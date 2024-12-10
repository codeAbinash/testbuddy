import {
  Mail02StrokeRoundedIcon,
  Mortarboard01StrokeRoundedIcon,
  Share02StrokeRoundedIcon,
  SmartPhone01StrokeRoundedIcon,
  StudentsStrokeRoundedIcon,
  UserStrokeRoundedIcon,
} from '@assets/icons/icons'
import Btn from '@components/Button'
import Input, { InputIcon } from '@components/Input'
import { KeyboardAvoid } from '@components/KeyboardAvoidingContainer'
import Label from '@components/Label'
import type { RouteProp } from '@react-navigation/native'
import TermsAndConditions from '@screens/components/TermsAndConditions'
import { Bold, SemiBold } from '@utils/fonts'
import type { StackNav } from '@utils/types'
import { View } from 'react-native'

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
  const { mobile } = route.params
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
                value={mobile}
                editable={false}
                className='opacity-70 text'
              />
            </View>
            <View>
              <Label text='Full Name' />
              <Input Left={<InputIcon Icon={UserStrokeRoundedIcon} />} placeholder='e.g. John Doe' />
            </View>
            <View>
              <Label text='Std' />
              <Input
                Left={<InputIcon Icon={Mortarboard01StrokeRoundedIcon} />}
                placeholder='e.g. 11th, 12th, dropper'
              />
            </View>
            <View>
              <Label text='Stream' />
              <Input Left={<InputIcon Icon={StudentsStrokeRoundedIcon} />} placeholder='e.g. Engineering or Medical' />
            </View>
            <View>
              <Label text='Email' />
              <Input
                Left={<InputIcon Icon={Mail02StrokeRoundedIcon} />}
                placeholder='e.g. example@example.com'
                keyboardType='email-address'
              />
            </View>
            <View>
              <Label text='Referral Code' />
              <Input Left={<InputIcon Icon={Share02StrokeRoundedIcon} />} placeholder='e.g. D4P98A' />
            </View>
          </View>
        </View>
        <View className='gap-3'>
          <Btn title={'Continue'} />
          <TermsAndConditions />
        </View>
      </View>
    </KeyboardAvoid>
  )
}
