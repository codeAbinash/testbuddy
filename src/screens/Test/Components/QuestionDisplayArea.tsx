import { ColorScheme, type mode } from '@utils/types'
import { timeDiffFromNow } from '@utils/utils'
import { useEffect } from 'react'
import { View } from 'react-native'
import useUpdateTestMutation from '../hooks/useUpdateTestMutation'
import MathJax from '../Math/MathJax'
import currentQnStore from '../zustand/currentQn'
import testStore from '../zustand/testStore'
import timeStore from '../zustand/timeStore'
import McqOptions from './McqOptions'
import MultiCorrectOptions from './MultiCorrectOptions'
import NumericalOptions from './NumericalOptions'

export default function QuestionDisplayArea({ colorScheme, mode }: { colorScheme: ColorScheme; mode: mode }) {
  const allQn = testStore((store) => store.allQn)
  const qnNo = currentQnStore((store) => store.qnNo)
  const qn = allQn?.[qnNo]?.questionContent
  const qnType = allQn?.[qnNo]?.questionType
  const setAllQn = testStore((store) => store.setAllQn)
  const lastOpenedQn = currentQnStore((store) => store.lastOpenedQn)
  const testSeriesId = testStore((store) => store.testData?.testSeriesId)
  const lastApiCallTime = timeStore((store) => store.lastApiCallTime)

  const { mutate } = useUpdateTestMutation(testSeriesId!)

  useEffect(() => {
    if (mode === 'solution') return
    if (!qn) return
    if (allQn[qnNo]) allQn[qnNo].visited = true
    setAllQn([...allQn])

    // Update total time spent on question
    const timer = setInterval(() => {
      if (!allQn[qnNo]) return
      allQn[qnNo].totalTimeSpent! += 1
      setAllQn([...allQn])
    }, 1000)

    // Clear timer on question change
    return () => clearInterval(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qn])

  useEffect(() => {
    if (mode === 'solution') return
    if (!allQn[lastOpenedQn]) return
    mutate({
      resData: [
        {
          question: allQn[lastOpenedQn].questionId!,
          action: 'question-change' as const,
          time: timeDiffFromNow(lastApiCallTime),
          marked: true,
          isBookMarked: allQn[lastOpenedQn].isBookMarked!,
          markedAnswer: allQn[lastOpenedQn].markedAnswer || '',
          nextQuestion: allQn[lastOpenedQn + 1]?.questionId!,
        },
      ],
      testSeriesId: testSeriesId!,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastOpenedQn])

  return (
    <View className='px-5'>
      <MathJax colorScheme={colorScheme} html={qn} />

      {qnType === 'mcq' && <McqOptions colorScheme={colorScheme} mode={mode} />}
      {qnType === 'numerical' && <NumericalOptions mode={mode} />}
      {qnType === 'multi-correct' && <MultiCorrectOptions colorScheme={colorScheme} mode={mode} />}
    </View>
  )
}
