import { FC, useEffect, useMemo, useState } from 'react'
import { ToastAndroid, View } from 'react-native'

import { useMutation, useQuery } from '@tanstack/react-query'
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
import { PaddingBottom } from '@components/SafePadding'
import api from '@query/api/api'
import { type RouteProp } from '@react-navigation/native'

import { IconButton } from '../../components/IconButton'
import { bookmarkBlog } from './api/bookmarkBlog'
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
}

export default function Blog({ route }: BlogProps) {
  const id = route.params.id
  const { colorScheme } = useColorScheme()
  const [isAnimationComplete, setIsAnimationComplete] = useState(false)

  const secondaryIcon = colorScheme === 'dark' ? colors.zinc[200] : colors.zinc[800]
  const primaryIcon = colorScheme === 'dark' ? colors.zinc[800] : colors.zinc[200]

  const { data, refetch } = useQuery({
    queryKey: ['blog', id],
    queryFn: () => api.blog(id),
    staleTime: 0,
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
      <Header data={data} refetch={refetch} />
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
              <IconButton variant='secondary'>
                <Share01StrokeRoundedIcon color={secondaryIcon} height={18} width={18} />
              </IconButton>
              <BookmarkButton
                blogId={id}
                colorPrimary={primaryIcon}
                colorSecondary={secondaryIcon}
                isBookmarked={data?.isBookmark}
                refetch={refetch}
              />
            </View>
            <SmallBtn className='flex-1' variant='secondary' style={{ flex: 1 }} title='Attempt Test' />
            <View className='flex-row gap-2'>
              <IconButton variant='primary'>
                <ArrowLeft01StrokeRoundedIcon color={primaryIcon} height={25} width={25} style={{ marginRight: 2 }} />
              </IconButton>
              <IconButton variant='primary'>
                <ArrowRight01StrokeRoundedIcon color={primaryIcon} height={25} width={25} style={{ marginLeft: 2 }} />
              </IconButton>
            </View>
          </View>
          <PaddingBottom />
        </View>
      </View>
    </>
  )
}

type BookmarkButtonProps = {
  blogId: string
  colorPrimary: string
  colorSecondary: string
  isBookmarked?: boolean
  refetch: () => void
}

const BookmarkButton: FC<BookmarkButtonProps> = ({ colorPrimary, colorSecondary, isBookmarked, blogId }) => {
  const [optimisticBookmarked, setOptimisticBookmarked] = useState(isBookmarked)

  useEffect(() => {
    setOptimisticBookmarked(isBookmarked)
  }, [isBookmarked])

  const { mutate } = useMutation({
    mutationKey: ['bookmarkBlog', blogId, isBookmarked],
    mutationFn: bookmarkBlog,
    onSuccess: () => {
      ToastAndroid.show(isBookmarked ? 'Removed from bookmarks' : 'Added to bookmarks', ToastAndroid.SHORT)
    },
  })

  function onClick() {
    setOptimisticBookmarked(!optimisticBookmarked)
    mutate({ bookmark: !optimisticBookmarked, blogId })
  }

  return (
    <IconButton variant={optimisticBookmarked ? 'primary' : 'secondary'} onPress={onClick}>
      <AllBookmarkStrokeRoundedIcon
        color={optimisticBookmarked ? colorPrimary : colorSecondary}
        height={18}
        width={18}
      />
    </IconButton>
  )
}
