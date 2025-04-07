import { FC, useEffect, useState } from 'react'
import { ToastAndroid, View } from 'react-native'

import { useMutation } from '@tanstack/react-query'
import { useColorScheme } from 'nativewind'

import BackButton from '@components/BackButton'
import Press from '@components/Press'
import { PaddingTop } from '@components/SafePadding'
import { Medium, SemiBold } from '@utils/fonts'
import type { ColorScheme, StackNav } from '@utils/types'

import { Blog } from '@query/api/api'
import { useNavigation } from '@react-navigation/native'
import { likeBlog } from '../api/likeBlog'
import ThumbsIcon, { UnfoldIcon } from './ThumbsIcon'

type HeaderProps = {
  data?: Blog
  refetch: () => void
}

const emptyBlog = {
  blogContent: '',
  title: '',
  isLike: false,
  readTime: '',
  _id: '',
  tags: [],
}

export default function Header({ data, refetch }: HeaderProps) {
  const { colorScheme } = useColorScheme()
  const navigation = useNavigation<StackNav>()

  const { blogContent: html, title, isLike, readTime, _id: id, tags } = data || emptyBlog

  function goToOnThisPage() {
    if (!html) return
    navigation.navigate('OnThisPage', { html, title, id, tags })
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
                {title || 'Loading...'}
              </SemiBold>
              <Medium style={{ fontSize: 10, lineHeight: 11 }} className='text-zinc-500 dark:text-zinc-400'>
                {readTime} • {tags?.join(' • ')}
              </Medium>
            </View>
            <UnfoldIcon colorScheme={colorScheme} onPress={goToOnThisPage} />
          </Press>
          <LikeButton
            blogId={id}
            colorScheme={colorScheme}
            isLiked={isLike}
            refetch={refetch}
            likeCount={data?.noOfLikes || 0}
          />
        </View>
      </View>
    </>
  )
}

type LikeButtonProps = {
  blogId: string
  colorScheme: ColorScheme
  isLiked?: boolean
  refetch: () => void
  likeCount: number
}

const LikeButton: FC<LikeButtonProps> = ({ colorScheme, isLiked = false, blogId, refetch, likeCount }) => {
  const [optimisticLiked, setOptimisticLiked] = useState(isLiked)
  const [optimisticCount, setOptimisticCount] = useState(likeCount || 0)

  useEffect(() => {
    console.log(likeCount)
    setOptimisticLiked(isLiked)
    setOptimisticCount(likeCount || 0)
  }, [isLiked, likeCount])

  const { mutate } = useMutation({
    mutationKey: ['likeBlog', blogId, isLiked],
    mutationFn: likeBlog,
    onSuccess: (data) => {
      console.log(data)
      ToastAndroid.show(optimisticLiked ? 'Unliked' : 'Liked', ToastAndroid.SHORT)
      refetch()
    },
  })

  function onLike() {
    console.log('optimisticLiked', optimisticLiked)
    setOptimisticLiked(!optimisticLiked)
    setOptimisticCount((prev) => (optimisticLiked ? prev - 1 : prev + 1))
    mutate({ blogId, like: !optimisticLiked })
  }

  return <ThumbsIcon isLiked={optimisticLiked} colorScheme={colorScheme} likeCount={optimisticCount} onPress={onLike} />
}
