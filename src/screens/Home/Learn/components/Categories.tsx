import { FC, useCallback, useMemo, useState } from 'react'
import { Image, TouchableOpacity, View } from 'react-native'
import Animated from 'react-native-reanimated'

import { defaultChapterImage } from '@/constants'
import { UnfoldLessStrokeRoundedIcon, UnfoldMoreStrokeRoundedIcon } from '@assets/icons/icons'
import { SemiBold } from '@utils/fonts'
import { layout } from '@utils/utils'
import { ChaptersCategory } from '../api/chaptersList'
import Chapter from './Chapter'

type CategoriesProps = {
  categories?: ChaptersCategory[]
}
const Categories: FC<CategoriesProps> = ({ categories }) => {
  const [collapsedCategories, setCollapsedCategories] = useState<Record<string, boolean>>({})

  const toggleCategory = useCallback((categoryKey: string) => {
    setCollapsedCategories((prev) => ({
      ...prev,
      [categoryKey]: !prev[categoryKey],
    }))
  }, [])

  // Filter out categories with no chapters
  const filteredCategories = useMemo(() => categories?.filter((category) => category.chapters.length > 0), [categories])

  return (
    <>
      {filteredCategories?.map((category) => {
        const chapters = category.chapters
        const isCollapsed = collapsedCategories[category.category] || false

        return (
          <Animated.View key={category.icon} layout={layout}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => toggleCategory(category.category)}
              className='flex-row items-center justify-between px-5 py-5'
            >
              <View className='flex-row items-center gap-3'>
                <Image source={{ uri: defaultChapterImage }} className='size-6' />
                <SemiBold className='text text-lg' key={category.icon}>
                  {category.category}
                </SemiBold>
              </View>
              {isCollapsed ? (
                <UnfoldLessStrokeRoundedIcon width={20} height={20} />
              ) : (
                <UnfoldMoreStrokeRoundedIcon width={20} height={20} />
              )}
            </TouchableOpacity>

            {!isCollapsed && (
              <View className='flex-row flex-wrap gap-2.5 px-5'>
                {chapters.map((chapter) => (
                  <Chapter key={chapter.chapter} chapter={chapter} />
                ))}
              </View>
            )}
          </Animated.View>
        )
      })}
    </>
  )
}

export default Categories
