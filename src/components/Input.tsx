import { JosefinSansSemiBold } from '@utils/fonts'
import { useColorScheme } from 'nativewind'
import React from 'react'
import { TextInput, type TextInputProps, View } from 'react-native'
import type { SvgProps } from 'react-native-svg'
import colors from 'tailwindcss/colors'

type InputProps = TextInputProps & {
  Left?: React.ReactNode
  Right?: React.ReactNode
}
export default function Input({ Left, Right, ...rest }: InputProps) {
  return (
    <View className='group'>
      <View
        className='w-full flex-row items-center gap-3 border border-zinc-200 bg-zinc-100 px-4 dark:border-zinc-800 dark:bg-zinc-900'
        style={{ borderRadius: 14.5 }}
      >
        {Left}
        <TextInput
          placeholder='Sample '
          keyboardType='number-pad'
          className='text-zinc-900 dark:text-zinc-100'
          placeholderTextColor={colors.zinc[500]}
          style={[
            JosefinSansSemiBold,
            { fontSize: 12.5, paddingVertical: 0, flex: 1, paddingTop: 13, paddingBottom: 17 },
          ]}
          {...rest}
        />
        {Right}
      </View>
    </View>
  )
}

type InputIconProps = {
  Icon: React.FC<SvgProps>
  iconProps?: SvgProps
}
export function InputIcon({ Icon, iconProps }: InputIconProps) {
  const { colorScheme } = useColorScheme()
  return (
    <Icon height={23} width={23} color={colorScheme === 'dark' ? colors.zinc[400] : colors.zinc[600]} {...iconProps} />
  )
}
