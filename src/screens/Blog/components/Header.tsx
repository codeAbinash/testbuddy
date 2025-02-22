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
  id: string
}

export default function Header({ title, readTime, tags, navigation, html, id }: HeaderProps) {
  const { colorScheme } = useColorScheme()

  function goToOnThisPage() {
    if (!html) return
    navigation.navigate('OnThisPage', { html, title, id })
  }

  return (
    <>
      <View className='bg-white pb-1 dark:bg-zinc-950'>
        <PaddingTop />
        <View className='flex-row items-center' style={{ gap: 2 }}>
          <BackButton colorScheme={colorScheme} onPress={() => navigation.goBack()} />
          <Press onPress={goToOnThisPage} className='flex-1 flex-row items-center'>
            <View className='flex-1 flex-col justify-center gap-0.5'>
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
            </View>
            <UnfoldIcon colorScheme={colorScheme} onPress={goToOnThisPage} />
          </Press>
          <ThumbsIcon isLiked={false} colorScheme={colorScheme} likeCount={10000} />
        </View>
      </View>
    </>
  )
}
