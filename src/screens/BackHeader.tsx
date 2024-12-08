import { ArrowLeft01StrokeRoundedIcon } from '@assets/icons/icons'
import { PaddingTop } from '@components/SafePadding'
import { SemiBold } from '@utils/fonts'
import type { StackNav } from '@utils/types'
import { useColorScheme } from 'nativewind'
import React from 'react'
import { TouchableOpacity, View, type ViewProps } from 'react-native'
import colors from 'tailwindcss/colors'

type BackHeaderProps = ViewProps & {
  navigation?: StackNav
  title?: string
  Title?: React.ReactNode
  Right?: React.ReactNode
  onBackPress?: () => void
}

export default function BackHeader({ navigation, Right, title, Title, onBackPress }: BackHeaderProps) {
  const { colorScheme } = useColorScheme()
  return (
    <View className='bg-white dark:bg-zinc-950'>
      <PaddingTop />
      <View className='px-5 pb-1.5 pl-1.5 pt-0'>
        {Title || (
          <View className='flex-row items-center' style={{ gap: 10 }}>
            <TouchableOpacity
              className='p-2 pr-1'
              onPress={() => (onBackPress ? onBackPress() : navigation && navigation.goBack())}
              activeOpacity={0.7}
            >
              <ArrowLeft01StrokeRoundedIcon
                width={26}
                height={26}
                color={colorScheme === 'dark' ? colors.zinc[200] : colors.zinc[800]}
              />
            </TouchableOpacity>
            <SemiBold
              style={{ fontSize: 14.3, flex: 1 }}
              className='-mt-0.5 text-zinc-800 dark:text-zinc-200'
              numberOfLines={1}
            >
              {title}
            </SemiBold>
            {Right}
          </View>
        )}
      </View>
    </View>
  )
}
