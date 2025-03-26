import React from 'react'
import { View, type ViewProps } from 'react-native'

import { useColorScheme } from 'nativewind'

import BackButton from '@components/BackButton'
import { PaddingTop } from '@components/SafePadding'
import { useNavigation } from '@react-navigation/native'
import { SemiBold } from '@utils/fonts'
import type { StackNav } from '@utils/types'

type BackHeaderProps = ViewProps & {
  title?: string
  Title?: React.ReactNode
  Right?: React.ReactNode
  onBackPress?: () => void
}

export default function BackHeader({ Right, title, Title, onBackPress }: BackHeaderProps) {
  const { colorScheme } = useColorScheme()
  const navigation = useNavigation<StackNav>()

  return (
    <View className='bg-white dark:bg-zinc-950'>
      <PaddingTop />
      <View className='px-5 pb-1.5 pl-1.5 pt-0'>
        {Title || (
          <View className='flex-row items-center' style={{ gap: 10 }}>
            <BackButton colorScheme={colorScheme} onPress={onBackPress || (() => navigation && navigation.goBack())} />
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
