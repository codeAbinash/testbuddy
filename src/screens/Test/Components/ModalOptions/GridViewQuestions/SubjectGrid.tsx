import currentQnStore from '@screens/Test/zustand/currentQn'
import modalStore from '@screens/Test/zustand/modalStore'
import { Section } from '@screens/Test/zustand/testStore'
import { SemiBold } from '@utils/fonts'
import React from 'react'
import { View } from 'react-native'
import Question from './Question'

const SubjectGrid = React.memo<{ section: Section; start: number }>(({ section, start }) => {
  const { setQnNo, qnNo } = currentQnStore()
  const setOpen = modalStore((store) => store.setOpen)
  return (
    <View className='mb-4'>
      <SemiBold className='text px-0.5 text-sm capitalize'>{section.subject}</SemiBold>
      <View className='mt-2 flex-row flex-wrap justify-between gap-2.5'>
        {section.questions?.map((_, i) => (
          <Question
            key={i}
            qnNo={start + i}
            isActive={qnNo === start + i}
            onPress={() => {
              setOpen(false)
              setQnNo(start + i)
            }}
          />
        ))}
      </View>
    </View>
  )
})

export default SubjectGrid
