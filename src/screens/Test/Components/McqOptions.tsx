import api from '@query/api'
import { useMutation } from '@tanstack/react-query'
import { Medium } from '@utils/fonts'
import { ColorScheme } from '@utils/types'
import { print, timeDiffFromNow } from '@utils/utils'
import React, { useCallback } from 'react'
import { TouchableOpacity, View } from 'react-native'
import MathJax from '../Math/MathJax'
import currentQnStore from '../zustand/currentQn'
import testStore from '../zustand/testStore'
import timeStore from '../zustand/timeStore'

const McqOptions = React.memo(({ colorScheme }: { colorScheme: ColorScheme }) => {
  const testSeriesId = testStore((store) => store.testData?.testSeriesId)
  const allQn = testStore((store) => store.allQn)
  const setAllQn = testStore((store) => store.setAllQn)
  const qnNo = currentQnStore((store) => store.qnNo)
  const qn = allQn?.[qnNo]
  const options = qn?.options ?? []
  const selected = qn?.markedAnswer ? qn?.markedAnswer.charCodeAt(0) - 65 : -1
  const lastApiCallTime = timeStore((store) => store.lastApiCallTime)

  const { mutate } = useMutation({
    mutationKey: ['updateTest', testSeriesId, qnNo],
    mutationFn: api.updateTest,
    onSuccess: print,
  })

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
        <TouchableOpacity
          key={i}
          className='flex-row items-center gap-5'
          activeOpacity={0.6}
          onPress={() => onSelect(i)}
        >
          <View
            className={`size-8 items-center justify-center rounded-full ${selected === i ? 'bg-accent dark:bg-white' : 'border border-zinc-300 dark:border-zinc-700'}`}
          >
            <Medium className={`mb-1 text-center text-sm ${selected === i ? 'text-white dark:text-accent' : 'text'} `}>
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

export default McqOptions
