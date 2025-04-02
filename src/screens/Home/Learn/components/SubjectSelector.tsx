import { FC } from 'react'
import { Image, TouchableOpacity, View } from 'react-native'

import { defaultSubjectImage } from '@/constants'
import { Medium } from '@utils/fonts'

import { ChaptersListRes } from '../api/chaptersList'

export type SubjectSelectorProps = {
  item: ChaptersListRes
  selectedIndex: number
  setSelectedIndex: (index: number) => void
  index: number
}
export const SubjectSelector: FC<SubjectSelectorProps> = ({ item, index, selectedIndex, setSelectedIndex }) => {
  const isActive = selectedIndex === index
  return (
    <TouchableOpacity className='justify-center gap-2.5' onPress={() => setSelectedIndex(index)} activeOpacity={0.7}>
      <View
        className={`rounded-xl justify-between overflow-hidden border-[1.5px] pt-1.5 ${isActive ? 'border-zinc-700 dark:border-zinc-300' : 'border-zinc-300 dark:border-zinc-700'}`}
      >
        <Image
          // source={{ uri: item.icon  || defaultSubjectImage}}
          source={{ uri: defaultSubjectImage }}
          className='w-16 h-16 m-3'
        />
        <View className={`w-full h-1.5 ${isActive ? 'bg-zinc-700 dark:bg-zinc-300' : 'bg-transparent'}`}></View>
      </View>
      <Medium className='text text-sm text-center'>{item.subject}</Medium>
    </TouchableOpacity>
  )
}
