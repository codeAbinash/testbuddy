import { useEffect, useMemo, useState } from 'react'
import { View, type TouchableOpacityProps } from 'react-native'

import { useQuery } from '@tanstack/react-query'
import { useColorScheme } from 'nativewind'
import WebView from 'react-native-webview'
import colors from 'tailwindcss/colors'

import {
  AllBookmarkStrokeRoundedIcon,
  ArrowLeft01StrokeRoundedIcon,
  ArrowRight01StrokeRoundedIcon,
  Share01StrokeRoundedIcon,
} from '@assets/icons/icons'
import { SmallBtn } from '@components/Button'
import { Loading } from '@components/Loading'
import Press from '@components/Press'
import { PaddingBottom } from '@components/SafePadding'
import api from '@query/api/api'
import { type RouteProp } from '@react-navigation/native'
import type { StackNav } from '@utils/types'

import Header from './components/Header'
import { wrapHtmlBlog } from './utils/wrapHtmlBlog'

export type BlogParamList = {
  id: string
}

type ParamList = {
  Blog: BlogParamList
}

type BlogProps = {
  route: RouteProp<ParamList, 'Blog'>
  navigation: StackNav
}

export default function Blog({ navigation, route }: BlogProps) {
  const id = route.params.id
  const { colorScheme } = useColorScheme()
  const [isAnimationComplete, setIsAnimationComplete] = useState(false)

  const secondaryIcon = colorScheme === 'dark' ? colors.zinc[200] : colors.zinc[800]
  const primaryIcon = colorScheme === 'dark' ? colors.zinc[800] : colors.zinc[200]

  const { data } = useQuery({
    queryKey: ['blog', id],
    queryFn: () => api.blog(id),
  })

  const wrappedHtml = useMemo(
    () => wrapHtmlBlog(data?.blogContent || '', colorScheme),
    [data?.blogContent, colorScheme],
  )

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimationComplete(true)
    }, 350)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <Header
        title={data?.title || 'Loading...'}
        readTime={data?.readTime || 'Calculating read time...'}
        tags={data?.tags || []}
        html={data?.blogContent || ''}
        navigation={navigation}
        id={id}
      />
      <View className='bg-screen flex-1 justify-between'>
        {data && isAnimationComplete ? (
          <View className='flex-1'>
            <WebView
              source={{ html: wrappedHtml }}
              style={{ backgroundColor: colorScheme === 'dark' ? 'black' : colors.zinc[50] }}
              scalesPageToFit={true}
            />
          </View>
        ) : (
          <View className='flex-1 items-center justify-center'>
            <Loading />
          </View>
        )}
        <View>
          <View className='flex-row justify-between gap-2.5 px-4 pb-1 pt-2.5'>
            <View className='flex-row gap-2'>
              <ButtonSecondary>
                <Share01StrokeRoundedIcon color={secondaryIcon} height={18} width={18} />
              </ButtonSecondary>
              <ButtonSecondary>
                <AllBookmarkStrokeRoundedIcon color={secondaryIcon} height={18} width={18} />
              </ButtonSecondary>
            </View>
            <SmallBtn className='flex-1' variant='secondary' style={{ flex: 1 }} title='Attempt Test' />
            <View className='flex-row gap-2'>
              <ButtonPrimary>
                <ArrowLeft01StrokeRoundedIcon color={primaryIcon} height={25} width={25} style={{ marginRight: 2 }} />
              </ButtonPrimary>
              <ButtonPrimary>
                <ArrowRight01StrokeRoundedIcon color={primaryIcon} height={25} width={25} style={{ marginLeft: 2 }} />
              </ButtonPrimary>
            </View>
          </View>
          <PaddingBottom />
        </View>
      </View>
    </>
  )
}

type ButtonPrimaryProps = TouchableOpacityProps & {}
function ButtonPrimary({ children }: ButtonPrimaryProps) {
  return (
    <Press
      className='items-center justify-center rounded-xl bg-accent dark:bg-zinc-100'
      style={{ height: 40, width: 40 }}
      activeOpacity={0.8}
      activeScale={0.9}
    >
      {children}
    </Press>
  )
}

type ButtonSecondaryProps = TouchableOpacityProps & {}
function ButtonSecondary({ children }: ButtonSecondaryProps) {
  return (
    <Press
      className='items-center justify-center rounded-xl border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900'
      style={{ height: 40, width: 40 }}
      activeOpacity={0.8}
      activeScale={0.9}
    >
      {children}
    </Press>
  )
}
