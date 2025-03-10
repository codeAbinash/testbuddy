import { Medium } from '@utils/fonts'
import { ColorScheme, type mode } from '@utils/types'
import { timeDiffFromNow } from '@utils/utils'
import React, { useCallback, useMemo } from 'react'
import { TouchableOpacity, View } from 'react-native'
import useUpdateTestMutation from '../hooks/useUpdateTestMutation'
import currentQnStore from '../zustand/currentQn'
import testStore from '../zustand/testStore'
import timeStore from '../zustand/timeStore'
import AnswerSelectionIndicator from './AnswerSelectionIndicator'
import MultiOptionSelector from './MultiOptionSelector'

const MultiCorrectOptions = React.memo(({ colorScheme, mode }: { colorScheme: ColorScheme; mode: mode }) => {
  const allQn = testStore((store) => store.allQn)
  const qnNo = currentQnStore((store) => store.qnNo)
  const options = allQn?.[qnNo]?.options ?? []
  const qn = allQn?.[qnNo]
  const marked = useMemo(() => qn?.markedAnswer?.split(',') ?? [], [qn?.markedAnswer])
  const setAllQn = testStore((store) => store.setAllQn)
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

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const onSelect = useCallback(
    (i: number) => {
      if (mode === 'solution') return
      if (!qn) return

      let markedAnswer: string[] = qn.markedAnswer ? qn.markedAnswer.split(',') : []
      const char = String.fromCharCode(65 + i)
      const index = markedAnswer.indexOf(char)
      if (index === -1) markedAnswer.push(char)
      else markedAnswer.splice(index, 1)

      qn.markedAnswer = markedAnswer.join(',')
      setAllQn([...allQn])
      mutateTest()
    },
    [allQn, qn, setAllQn],
  )

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const clearSelection = useCallback(() => {
    if (!qn) return
    qn.markedAnswer = ''
    setAllQn([...allQn])
    mutateTest()
  }, [allQn, qn, setAllQn])

  return (
    <View>
      <View className='mb-10 flex-row items-center justify-center'>
        <Medium className='rounded-full bg-blue-500/15 px-6 py-2 pt-2.5 text-center text-sm text-blue-500'>
          Select all correct options
        </Medium>
      </View>
      {options.map((op, i) => (
        <MultiOptionSelector
          key={i}
          i={i}
          onSelect={onSelect}
          mode={mode}
          selected={marked}
          qn={qn}
          colorScheme={colorScheme}
          op={op}
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

export default MultiCorrectOptions
