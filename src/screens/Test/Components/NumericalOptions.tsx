import Input from '@components/Input'
import Label from '@components/Label'
import { Medium } from '@utils/fonts'
import { mode } from '@utils/types'
import { timeDiffFromNow } from '@utils/utils'
import React, { useCallback } from 'react'
import { TouchableOpacity, View } from 'react-native'
import useUpdateTestMutation from '../hooks/useUpdateTestMutation'
import currentQnStore from '../zustand/currentQn'
import testStore from '../zustand/testStore'
import timeStore from '../zustand/timeStore'

const NumericalOptions = React.memo(({ mode }: { mode: mode }) => {
  const allQn = testStore((store) => store.allQn)
  const qnNo = currentQnStore((store) => store.qnNo)
  const setAllQn = testStore((store) => store.setAllQn)
  const qn = allQn?.[qnNo]
  const text = qn?.markedAnswer
  const lastApiCallTime = timeStore((store) => store.lastApiCallTime)
  const testSeriesId = testStore((store) => store.testData?.testSeriesId)

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

  const onChange = useCallback(
    (text: string) => {
      if (mode !== 'solution') return
      const question = allQn?.[qnNo]
      if (!question) return
      question.markedAnswer = text
      setAllQn([...allQn])
      mutateTest()
    },
    [allQn, qnNo, setAllQn],
  )

  return (
    <View>
      <Label text='Type your answer below' />
      <Input
        placeholder='Type your answer here'
        keyboardType='numeric'
        value={text}
        onChangeText={onChange}
        editable={mode === 'test'}
      />
      {mode === 'test' && qn?.markedAnswer && (
        <TouchableOpacity className='mt-6' activeOpacity={0.6} onPress={() => onChange('')}>
          <Medium className='text text-sm underline'>Clear answer</Medium>
        </TouchableOpacity>
      )}
    </View>
  )
})

export default NumericalOptions
