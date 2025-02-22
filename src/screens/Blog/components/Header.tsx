import { useColorScheme } from 'nativewind'
import { View } from 'react-native'

import BackButton from '@components/BackButton'
import Press from '@components/Press'
import { PaddingTop } from '@components/SafePadding'
import { Medium, SemiBold } from '@utils/fonts'
import type { StackNav } from '@utils/types'

import ThumbsIcon, { UnfoldIcon } from './ThumbsIcon'

type HeaderProps = {
  title: string
  readTime: string
  tags: string[]
  navigation: StackNav
  html: string
}

export default function Header({ title, readTime, tags, navigation, html }: HeaderProps) {
  const { colorScheme } = useColorScheme()

  function goToOnThisPage() {
    navigation.navigate('OnThisPage', { html })
  }

  return (
    <>
      <View className='bg-white pb-1 dark:bg-zinc-950'>
        <PaddingTop />
        <View className='flex-row items-center' style={{ gap: 2 }}>
          <BackButton colorScheme={colorScheme} onPress={() => navigation.goBack()} />
          <Press className='flex-1 flex-col justify-center gap-0.5' onPress={goToOnThisPage}>
            <SemiBold
              style={{ fontSize: 12, lineHeight: 14 }}
              className='text-zinc-800 dark:text-zinc-200'
              numberOfLines={1}
            >
              {title}
            </SemiBold>
            <Medium style={{ fontSize: 10, lineHeight: 11 }} className='text-zinc-500 dark:text-zinc-400'>
              {readTime} • {tags.join(' • ')}
            </Medium>
          </Press>
          <UnfoldIcon colorScheme={colorScheme} onPress={goToOnThisPage} />
          <ThumbsIcon isLiked={false} colorScheme={colorScheme} likeCount={10000} />
        </View>
      </View>
    </>
  )
}
