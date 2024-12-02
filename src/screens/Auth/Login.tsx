import { Home01Icon, SmartPhone01StrokeRoundedIcon } from '@assets/icons/icons'
import Btn from '@components/Button'
import KeyboardAvoidingContainer from '@components/KeyboardAvoidingContainer'
import { PaddingBottom, PaddingTop } from '@components/SafePadding'
import LoginImage from '@images/login.svg'
import { Bold, Medium, PoppinsMedium, SemiBold } from '@utils/fonts'
import { useColorScheme } from 'nativewind'
import React from 'react'
import { TextInput, View, type TextInputProps } from 'react-native'
import type { SvgProps } from 'react-native-svg'
import colors from 'tailwindcss/colors'

export default function Login() {
  return (
    <KeyboardAvoidingContainer>
      <PaddingTop />
      <View className='h-screen flex-1 justify-between gap-10 px-5'>
        <View>
          <View className='items-center justify-center'>
            <LoginImage className='' />
          </View>
        </View>
        <View className='gap-1'>
          <Bold className='text w-full text-3xl'>Login or Signup with TestBuddy</Bold>
          <Medium className='text w-full text-sm opacity-90'>Ultimate Destination for All Your Practice!</Medium>
        </View>
        <Medium className='text tex-[0.7rem] text-center text-xs'>Enter your mobile number to continue</Medium>
        <Input Left={<Icon Icon={SmartPhone01StrokeRoundedIcon} />} />
        <Btn title='Send OTP' />
        <View className='flex-row items-center justify-center'>
          <View className='h-0.5 w-1/3 bg-zinc-300' />
          <Medium className='text w-1/5 text-center text-xs'>Or</Medium>
          <View className='h-0.5 w-1/3 bg-zinc-300' />
        </View>
        <Btn title='Continue with Google' children={<Icon Icon={Home01Icon} />} />
        <View>
          <Medium className='text mb-2 mt-2 text-center text-[0.6rem]'>
            By continuing, you agree to our <SemiBold className='text-blue-500'>Terms of Service</SemiBold> and{' '}
            <SemiBold className='text-blue-500'>Privacy Policy</SemiBold>.
          </Medium>
        </View>
      </View>
      <PaddingBottom />
    </KeyboardAvoidingContainer>
  )
}

type InputProps = TextInputProps & {
  Left?: React.ReactNode
  Right?: React.ReactNode
}
function Input({ Left, Right }: InputProps) {
  return (
    <View
      className='flex-row items-center gap-3 border border-zinc-200 bg-zinc-100 px-3.5 dark:border-zinc-800 dark:bg-zinc-900'
      style={{ borderRadius: 14.5 }}
    >
      {Left}
      <TextInput
        placeholder='Enter your mobile number'
        keyboardType='number-pad'
        className='text-accent dark:text-zinc-100'
        placeholderTextColor={colors.zinc[500]}
        style={[PoppinsMedium, { fontSize: 12.5, paddingVertical: 0, flex: 1, paddingTop: 13.5, paddingBottom: 13.5 }]}
      />
      {Right}
    </View>
  )
}

type IconProps = {
  Icon: React.FC<SvgProps>
  iconProps?: SvgProps
}
function Icon({ Icon, iconProps }: IconProps) {
  const { colorScheme } = useColorScheme()
  return (
    <Icon height={25} width={25} color={colorScheme === 'dark' ? colors.zinc[400] : colors.zinc[600]} {...iconProps} />
  )
}
