import { Medium, SemiBold } from '@utils/fonts'
import React from 'react'
import { TouchableOpacity, type TouchableOpacityProps } from 'react-native'

type ButtonProps = TouchableOpacityProps & { title?: string; Content?: React.ReactNode }

const Btn = React.memo(({ title, onPress, disabled, children, style, ...rest }: ButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      className='w-full bg-accent dark:bg-zinc-200'
      style={[
        { borderRadius: 14.5, paddingVertical: 13.5, paddingHorizontal: 13.5, opacity: disabled ? 0.8 : 1 },
        style,
      ]}
      disabled={disabled}
      {...rest}
    >
      <SemiBold style={{ fontSize: 12.2 }} className='text-center text-white dark:text-zinc-800'>
        {title || children}
      </SemiBold>
    </TouchableOpacity>
  )
})

export default Btn

export const BtnTransparent = React.memo(({ title, onPress, children, style }: ButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      className='w-full border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900'
      style={[{ borderRadius: 14.5, paddingVertical: 12 }]}
    >
      {title && (
        <SemiBold style={[{ fontSize: 12.2 }, style]} className='text-center text-accent dark:text-white'>
          {title}
        </SemiBold>
      )}
      {children}
    </TouchableOpacity>
  )
})
