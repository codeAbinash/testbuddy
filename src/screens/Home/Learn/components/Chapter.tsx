import { FC } from 'react'
import { Image, TouchableOpacity } from 'react-native'

import colors from 'tailwindcss/colors'

import { defaultChapterImage } from '@/constants'
import { BookOpen01Icon, Idea01Icon, LicenseIcon, ThumbsUpIcon } from '@assets/icons/icons'
import { Medium } from '@utils/fonts'

import { ChapterCategory } from '../api/chaptersList'

type ChapterProps = {
  chapter: ChapterCategory
}
const Chapter: FC<ChapterProps> = ({ chapter }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className='items-center gap-1.5 p-3 w-[31%] border rounded-xl border-zinc-500/40 justify-center'
    >
      <Image source={{ uri: defaultChapterImage }} className='size-12' />
      <Medium className='text-center text text-xs' numberOfLines={2}>
        {chapter.chapter}
      </Medium>
      <Medium className='text opacity-70' style={{ lineHeight: 17, fontSize: 10 }}>
        <Idea01Icon height={12} width={12} color={colors.amber[500]} />
        {'  '}
        {chapter.topicCount} <LicenseIcon height={12} width={12} color={colors.lime[500]} />
        {'  '}
        {chapter.testCount} Tests{' \n'}
        <BookOpen01Icon height={12} width={12} color={colors.zinc[500]} />
        {'  '}
        {chapter.readingTime} min{'  '}
        <ThumbsUpIcon height={12} width={12} color={colors.blue[500]} />
        {'  '}
        {chapter.likesCount}
      </Medium>
    </TouchableOpacity>
  )
}

export default Chapter
