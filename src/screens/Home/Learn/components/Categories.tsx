import { FC } from 'react'
import { Image, View } from 'react-native'

import { defaultChapterImage } from '@/constants'
import { Medium } from '@utils/fonts'

import { ChaptersCategory } from '../api/chaptersList'
import Chapter from './Chapter'

type CategoriesProps = {
  categories?: ChaptersCategory[]
}
const Categories: FC<CategoriesProps> = ({ categories }) => {
  return (
    <>
      {categories?.map((category) => {
        const chapters = category.chapters
        return (
          <View key={category.icon}>
            <View className='flex-row items-center gap-3 px-5 py-5'>
              {/*TODO(abinash): remove hardcoded image */}
              {/* <Image source={{ uri: category.icon }} className='w-8 h-8' /> */}
              <Image source={{ uri: defaultChapterImage }} className='size-6' />
              <Medium key={category.icon}>{category.category}</Medium>
            </View>
            <View className='flex-row flex-wrap gap-2.5 px-5'>
              {chapters.map((chapter) => (
                <Chapter key={chapter.chapter} chapter={chapter} />
              ))}
            </View>
          </View>
        )
      })}
    </>
  )
}

export default Categories
