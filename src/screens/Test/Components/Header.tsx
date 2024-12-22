import { ArrowLeft01StrokeRoundedIcon } from '@assets/icons/icons'
import { SmallBtn } from '@components/Button'
import { PaddingTop } from '@components/SafePadding'
import { SemiBold } from '@utils/fonts'
import { ColorScheme, StackNav } from '@utils/types'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import colors from 'tailwindcss/colors'
import { Test } from '../types'
import { MoreOption } from './MoreOption'

type HeaderProps = {
  navigation: StackNav
  data: Test
  colorScheme: ColorScheme
  isOpen: (open: boolean) => void
}

export const Header = React.memo<HeaderProps>(({ navigation, data, colorScheme, isOpen }) => {
  return (
    <View className='bg-white dark:bg-zinc-950'>
      <PaddingTop />
      <View className='flex-row items-center' style={{ gap: 10 }}>
        <TouchableOpacity className='pb-2.5 pl-2.5 pr-0 pt-2' onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <ArrowLeft01StrokeRoundedIcon
            width={26}
            height={26}
            color={colorScheme === 'dark' ? colors.zinc[200] : colors.zinc[800]}
          />
        </TouchableOpacity>
        <View className='flex-1 flex-col'>
          <View className='flex-row justify-between gap-1'>
            <SemiBold
              style={{ fontSize: 11, flex: 1, lineHeight: 16 }}
              className='-mt-0.5 text-zinc-800 dark:text-zinc-200'
              numberOfLines={2}
            >
              {data?.test?.testTitle || 'Loading...'}{' '}
              <SemiBold className='capitalize dark:text-zinc-400 text-zinc-500'>({data?.test?.language})</SemiBold>
            </SemiBold>
            <View className='justify-center'>
              <SmallBtn title='Submit' style={{ paddingHorizontal: 17, paddingVertical: 5, borderRadius: 9 }} />
            </View>
          </View>
        </View>
        <MoreOption colorScheme={colorScheme} onPress={() => isOpen(true)} />
      </View>
    </View>
  )
})
