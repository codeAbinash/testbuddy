import { Medium } from '@utils/fonts'
import { ColorScheme } from '@utils/types'
import { timeDiffFromNow } from '@utils/utils'
import React, { useCallback, useMemo } from 'react'
import { TouchableOpacity, View } from 'react-native'
import useUpdateTestMutation from '../hooks/useUpdateTestMutation'
import MathJax from '../Math/MathJax'
import currentQnStore from '../zustand/currentQn'
import testStore from '../zustand/testStore'
import timeStore from '../zustand/timeStore'

const MultiCorrectOptions = React.memo(({ colorScheme }: { colorScheme: ColorScheme }) => {
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

  const onSelect = useCallback(
    (i: number) => {
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

  const clearSelection = useCallback(() => {
    if (!qn) return
    qn.markedAnswer = ''
    setAllQn([...allQn])
    mutateTest()
  }, [allQn, qn, setAllQn])

  return (
    <View>
      <Medium className='mb-5 rounded-xl bg-green-500/10 py-3 text-center text-sm text-green-500'>
        Select all correct options
      </Medium>
      {options.map((op, i) => (
        <TouchableOpacity
          key={i}
          className='flex-row items-center gap-5'
          activeOpacity={0.6}
          onPress={() => onSelect(i)}
        >
          <View
            className={`size-8 items-center justify-center rounded-full ${
              marked.includes(String.fromCharCode(65 + i))
                ? 'bg-accent dark:bg-white'
                : 'border border-zinc-300 dark:border-zinc-700'
            }`}
          >
            <Medium
              className={`mb-1 text-center text-sm ${marked.includes(String.fromCharCode(65 + i)) ? 'text-white dark:text-accent' : 'text'} `}
            >
              {String.fromCharCode(65 + i)}
            </Medium>
          </View>
          <View className='flex-1'>
            <MathJax key={i} colorScheme={colorScheme} html={op.content} />
          </View>
        </TouchableOpacity>
      ))}
      {qn?.markedAnswer && (
        <TouchableOpacity className='mt-6' activeOpacity={0.6} onPress={clearSelection}>
          <Medium className='text text-sm underline'>Clear selection</Medium>
        </TouchableOpacity>
      )}
    </View>
  )
})

export default MultiCorrectOptions
