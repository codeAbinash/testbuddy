import { SmallBtn } from '@components/Button'
import { Loading } from '@components/Loading'
import { PaddingBottom } from '@components/SafePadding'
import api from '@query/api'
import type { RouteProp } from '@react-navigation/native'
import BackHeader from '@screens/components/BackHeader'
import { useQuery } from '@tanstack/react-query'
import type { StackNav } from '@utils/types'
import { useColorScheme } from 'nativewind'
import { useEffect, useMemo } from 'react'
import { ToastAndroid, View } from 'react-native'
import WebView from 'react-native-webview'
import colors from 'tailwindcss/colors'
import { wrapHtmlBlog } from './utils'

type ParamList = {
  Blog: BlogParamList
}

export type BlogParamList = {
  id: string
}

type BlogProps = {
  route: RouteProp<ParamList, 'Blog'>
  navigation: StackNav
}

export default function Blog({ navigation, route }: BlogProps) {
  const id = route.params.id
  const { colorScheme } = useColorScheme()
  const { data } = useQuery({
    queryKey: ['blog', id],
    queryFn: () => api.blog(id),
  })

  const wrappedHtml = useMemo(
    () => wrapHtmlBlog(data?.blogContent || '', colorScheme),
    [data?.blogContent, colorScheme],
  )


  return (
    <>
      <BackHeader navigation={navigation} title={data?.title || 'Loading...'} />
      <View className='screen-bg flex-1 justify-between'>
        <View className='flex-1'>
          {data ? (
            <WebView
              source={{ html: wrappedHtml }}
              style={{ backgroundColor: colorScheme === 'dark' ? 'black' : colors.zinc[50] }}
              scalesPageToFit={true}
            />
          ) : (
            <Loading colorScheme={colorScheme} />
          )}
        </View>
        <View>
          <View className='flex-row gap-2.5 px-4 pb-1 pt-2.5'>
            <SmallBtn variant='secondary' style={{ flex: 0.7 }} title='Attempt Test' />
            <SmallBtn variant='secondary' style={{ flex: 0.7 }} title='Next' />
          </View>
          <PaddingBottom />
        </View>
      </View>
    </>
  )
}
