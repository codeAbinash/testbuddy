import React from 'react'
import { StatusBar, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

import { PaddingBottom } from '@components/SafePadding'
import { AppBar } from '@components/TopBar'
import { RouteProp } from '@react-navigation/native'
import { Medium, SemiBold } from '@utils/fonts'
import { StackNav } from '@utils/types'

import HeadingsList from './components/HeadingsList'
import { extractHeadings } from './utils/extractHeadings'

type ParamList = {
  OnThisPage: OnThisPageParamList
}

export type OnThisPageParamList = {
  html: string
  title: string
  id: string
  tags: string[]
}

type OnThisPageProps = {
  route: RouteProp<ParamList, 'OnThisPage'>
  navigation: StackNav
}

const OnThisPage: React.FC<OnThisPageProps> = ({ route }) => {
  const title = route.params.title
  const html = route.params.html
  const tags = route.params.tags

  const headings = React.useMemo(() => extractHeadings(html), [html])

  return (
    <>
      <StatusBar barStyle='default' />
      <View className='flex-1 dark:bg-zinc-900/70'>
        <AppBar />
        <SemiBold className='textBlack -mt-0.5 mb-2 text-center text-xs'>{title}</SemiBold>
        <View className='flex-1 bg-zinc-100 dark:bg-zinc-900'>
          <View className='flex-row flex-wrap items-center gap-2 px-5 pt-4'>
            <Medium className='text-xs text-zinc-500'>Tags:</Medium>
            {tags.map((tag, index) => (
              <Medium key={index} className='rounded-full bg-zinc-500/10 p-1.5 px-4 text-xs'>
                {tag}
              </Medium>
            ))}
          </View>
          <ScrollView contentContainerClassName='px-5 pb-4 pt-4'>
            <HeadingsList headings={headings} />
            <PaddingBottom />
          </ScrollView>
        </View>
      </View>
    </>
  )
}

export default OnThisPage
