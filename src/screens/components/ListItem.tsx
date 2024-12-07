import { ArrowRight01StrokeRoundedIcon } from '@assets/icons/icons'
import { Medium, SemiBold } from '@utils/fonts'
import type { ColorScheme } from '@utils/types'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import type { SvgProps } from 'react-native-svg'
import colors from 'tailwindcss/colors'

export default function ListItem({
  icon,
  title,
  subtitle,
  onPress,
}: {
  icon: React.ReactNode
  title: string
  subtitle?: string
  onPress?: () => void
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      // className='w-full flex-row justify-between gap-5 rounded-2xl bg-white px-3 py-3.5 transition-colors active:bg-zinc-100 dark:bg-zinc-950 dark:active:bg-zinc-900'
      className='w-full flex-row justify-between gap-5 rounded-2xl px-3 py-3.5 pr-3'
    >
      <View className='flex-shrink flex-row items-center gap-3'>
        {icon}
        <SemiBold className='text text-sm opacity-80' numberOfLines={1}>
          {title}
        </SemiBold>
      </View>
      <View className='flex-shrink flex-grow flex-row items-center justify-end'>
        {subtitle && <Medium className='text text-xs opacity-70'>{subtitle}</Medium>}
        <ArrowRight01StrokeRoundedIcon height={18} width={18} color={colors.zinc[600]} />
      </View>
    </TouchableOpacity>
  )
}

export function ListIcon({ Icon, scheme }: { Icon: React.FC<SvgProps>; scheme: ColorScheme }) {
  return <Icon height={18} width={18} color={scheme === 'dark' ? colors.zinc[300] : colors.zinc[700]} />
}
