import { SemiBold } from '@utils/fonts'
import React from 'react'
import { StyleSheet, TouchableOpacity, type TouchableOpacityProps } from 'react-native'

type ButtonProps = TouchableOpacityProps & { title?: string; Content?: React.ReactNode }

const styles = StyleSheet.create({
  container: {
    borderRadius: 14.5,
    paddingTop: 12.5,
    paddingBottom: 15.5,
    paddingHorizontal: 13.5,
  },
})

const Btn = React.memo(({ title, onPress, disabled, children, style, ...rest }: ButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      className='w-full bg-accent dark:bg-zinc-100'
      style={[styles.container, { opacity: disabled ? 0.5 : 1 }, style]}
      disabled={disabled}
      {...rest}
    >
      <SemiBold style={{ fontSize: 12.5 }} className='text-center text-white dark:text-zinc-800'>
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
        <SemiBold style={[{ fontSize: 12.5 }, style]} className='text-center text-accent dark:text-white'>
          {title}
        </SemiBold>
      )}
      {children}
    </TouchableOpacity>
  )
})

type SmallBtnProps = ButtonProps & {
  variant?: 'primary' | 'secondary'
}

const SmallBtnBgClassName = {
  primary: 'bg-accent dark:bg-zinc-100',
  secondary: 'bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800',
}

const SmallBtnTextClassName = {
  primary: 'text-white dark:text-zinc-800',
  secondary: 'text-accent dark:text-white',
}

export const SmallBtn = React.memo(({ title, onPress, children, style, variant = 'primary' }: SmallBtnProps) => {
  const bg = SmallBtnBgClassName[variant]
  const color = SmallBtnTextClassName[variant]
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      className={`flex items-center justify-center ${bg}`}
      style={[{ borderRadius: 11, paddingVertical: 10 }, style]}
    >
      <SemiBold style={[{ fontSize: 11.5 }]} className={`mb-1 text-center ${color}`}>
        {title}
      </SemiBold>
      {children}
    </TouchableOpacity>
  )
})
