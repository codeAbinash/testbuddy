import { FC, memo } from 'react'
import { Image, TouchableOpacity } from 'react-native'


import { defaultChapterImage } from '@/constants'
import { Medium } from '@utils/fonts'

import { ChapterCategory } from '../api/chaptersList'

type FormulaChapterProps = {
  chapter: ChapterCategory
}
const FormulaChapter: FC<FormulaChapterProps> = ({ chapter }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className='items-center gap-1.5 p-3 w-[31%] border rounded-lg border-zinc-500/20 justify-center'
    >
      <Image source={{ uri: defaultChapterImage }} className='size-12' />
      <Medium className='text-center text text-xs' numberOfLines={2}>
        {chapter.chapter}
      </Medium>
    </TouchableOpacity>
  )
}

export default memo(FormulaChapter)
