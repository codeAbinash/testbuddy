import { Medium } from '@utils/fonts'
import React from 'react'
import { View } from 'react-native'
import currentQnStore from '../zustand/currentQn'
import modalStore from '../zustand/modalStore'
import testStore from '../zustand/testStore'
import Question from './ModalOptions/GridViewQuestions/Question'

const ListViewQuestions = React.memo(() => {
  const allQn = testStore((store) => store.allQn)
  const { setQnNo, qnNo } = currentQnStore()
  const setOpen = modalStore((store) => store.setOpen)

  return (
    <View className='px-4'>
      {allQn.map((qn, i) => (
        <View key={qn.questionId} className='flex-row items-center justify-between gap-4 py-1.5'>
          <Question
            qnNo={i}
            isActive={qnNo === i}
            isBookmarked={qn.isBookMarked || false}
            visited={qn.visited || false}
            isAnswered={!!qn.markedAnswer}
            onPress={() => {
              setQnNo(i)
              setOpen(false)
            }}
          />
          <Medium numberOfLines={1} className='text flex-shrink flex-grow-0 text-sm'>
            {qn.questionContent ? qn.questionContent.trim() : ''}
          </Medium>
        </View>
      ))}
    </View>
  )
})

export default ListViewQuestions
