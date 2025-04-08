import { CheckmarkSquare01Icon } from '@assets/icons/icons'
import Colors from '@utils/colors'
import { SemiBold } from '@utils/fonts'
import { useColorScheme } from 'nativewind'
import React, { FC } from 'react'
import { TouchableOpacity } from 'react-native'
import colors from 'tailwindcss/colors'

type CheckBoxProps = {
  label?: string
  checked?: boolean
  onChange?: (value: boolean) => void
  children?: React.ReactNode
  className?: string
  disabled?: boolean
}

const CheckBox: FC<CheckBoxProps> = ({ label, checked, onChange, children, className, disabled }) => {
  const { colorScheme } = useColorScheme()

  return (
    <TouchableOpacity
      onPress={() => !disabled && onChange?.(!checked)}
      activeOpacity={0.7}
      className={`flex-row items-center gap-3 ${className}`}
      style={{ opacity: disabled ? 0.6 : 1 }}
      disabled={disabled}
    >
      <CheckmarkSquare01Icon
        height={22}
        width={22}
        color={colorScheme === 'dark' ? colors.zinc[100] : Colors.accent}
        opacity={checked ? 1 : 0.2}
      />
      {label && <SemiBold className='text mt-1 text-sm'>{label}</SemiBold>}
      {children}
    </TouchableOpacity>
  )
}

export default CheckBox
