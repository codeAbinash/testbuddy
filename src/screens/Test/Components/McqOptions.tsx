import { Medium } from '@utils/fonts'
import { ColorScheme, mode } from '@utils/types'
import { timeDiffFromNow } from '@utils/utils'
import React, { useCallback } from 'react'
import { TouchableOpacity, View } from 'react-native'
import useUpdateTestMutation from '../hooks/useUpdateTestMutation'
import currentQnStore from '../zustand/currentQn'
import testStore from '../zustand/testStore'
import timeStore from '../zustand/timeStore'
import AnswerSelectionIndicator from './AnswerSelectionIndicator'
import MCQSelector from './MCQSelector'

const McqOptions = React.memo(({ colorScheme, mode }: { colorScheme: ColorScheme; mode: mode }) => {
  const testSeriesId = testStore((store) => store.testData?.testSeriesId)
  const allQn = testStore((store) => store.allQn)
  const setAllQn = testStore((store) => store.setAllQn)
  const qnNo = currentQnStore((store) => store.qnNo)
  const qn = allQn?.[qnNo]
  const options = qn?.options ?? []
  const selected = qn?.markedAnswer ? qn?.markedAnswer.charCodeAt(0) - 65 : -1
  const lastApiCallTime = timeStore((store) => store.lastApiCallTime)

  const { mutate } = useUpdateTestMutation(testSeriesId!)

  function mutateTest() {
    mutate({
      resData: [
        {
          question: qn!.questionId!,
          action: 'answer-update',
          time: timeDiffFromNow(lastApiCallTime),
          marked: true,
          markedAnswer: qn!.markedAnswer,
          nextQuestion: allQn[qnNo + 1]?.questionId!,
        },
      ],
      testSeriesId: testSeriesId!,
    })
  }

  const onSelect = useCallback(
    (i: number) => {
      if (mode === 'solution') return
      if (!qn) return
      qn.markedAnswer = String.fromCharCode(65 + i)
      setAllQn([...allQn])
      mutateTest()
    },
    [allQn, qn, setAllQn],
  )

  const clearSelection = useCallback(() => {
    if (!qn) return
    qn.markedAnswer = ''
    setAllQn([...allQn])
    mutateTest()
  }, [allQn, qn, setAllQn])

  return (
    <View className='gap-2'>
      {options.map((op, i) => (
        <MCQSelector
          key={i}
          content={op.content}
          i={i}
          selected={selected}
          onSelect={onSelect}
          colorScheme={colorScheme}
          mode={mode}
          isCorrect={qn?.isCorrect}
          correct_options={qn?.correct_options}
        />
      ))}
      {mode === 'test' && qn?.markedAnswer && (
        <TouchableOpacity className='mt-6' activeOpacity={0.6} onPress={clearSelection}>
          <Medium className='text text-sm underline'>Clear selection</Medium>
        </TouchableOpacity>
      )}
      {mode === 'solution' && <AnswerSelectionIndicator />}
    </View>
  )
})

export default McqOptions
