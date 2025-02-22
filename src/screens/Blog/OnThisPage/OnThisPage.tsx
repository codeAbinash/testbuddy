import React from 'react'
import { StatusBar, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

import { PaddingBottom } from '@components/SafePadding'
import { AppBar } from '@components/TopBar'
import { RouteProp } from '@react-navigation/native'
import { SemiBold } from '@utils/fonts'
import { StackNav } from '@utils/types'

import HeadingsList from '../components/HeadingsList'
import { extractHeadings } from '../utils/extractHeadings'

type ParamList = {
  OnThisPage: OnThisPageParamList
}

export type OnThisPageParamList = {
  html: string
  title: string
  id: string
}

type OnThisPageProps = {
  route: RouteProp<ParamList, 'OnThisPage'>
  navigation: StackNav
}

const OnThisPage: React.FC<OnThisPageProps> = ({ route }) => {
  const title = route.params.title
  const html = route.params.html
  const headings = React.useMemo(() => extractHeadings(html), [html])

  return (
    <>
      <StatusBar barStyle='default' />
      <View className='flex-1'>
        <AppBar />
        <SemiBold className='textBlack -mt-2 mb-3 text-center text-xs'>{title}</SemiBold>
        <ScrollView contentContainerClassName='px-5 pb-4'>
          <HeadingsList headings={headings} />
          <PaddingBottom />
        </ScrollView>
      </View>
    </>
  )
}

export default OnThisPage
