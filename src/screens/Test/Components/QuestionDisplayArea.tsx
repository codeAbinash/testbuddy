import Input from '@components/Input'
import Label from '@components/Label'
import { Medium } from '@utils/fonts'
import { ColorScheme } from '@utils/types'
import React, { useCallback, useEffect, useMemo } from 'react'
import { TouchableOpacity, View } from 'react-native'
import MathJax from '../Math/MathJax'
import currentQnStore from '../zustand/currentQn'
import testStore from '../zustand/testStore'

export default function QuestionDisplayArea({ colorScheme }: { colorScheme: ColorScheme }) {
  const allQn = testStore((store) => store.allQn)
  const qnNo = currentQnStore((store) => store.qnNo)
  const qn = allQn?.[qnNo]?.questionContent
  const qnType = allQn?.[qnNo]?.questionType
  const setAllQn = testStore((store) => store.setAllQn)

  useEffect(() => {
    if (allQn[qnNo]) allQn[qnNo].visited = true
    setAllQn([...allQn])
  }, [qn])

  return (
    <View className='px-5 pb-14'>
      <MathJax colorScheme={colorScheme} html={qn} />

      {qnType === 'mcq' && <McqOptions colorScheme={colorScheme} />}
      {qnType === 'numerical' && <NumericalOptions colorScheme={colorScheme} />}
      {qnType === 'multi-correct' && <MultiCorrectOptions colorScheme={colorScheme} />}
    </View>
  )
}

const NumericalOptions = React.memo(({ colorScheme }: { colorScheme: ColorScheme }) => {
  const allQn = testStore((store) => store.allQn)
  const qnNo = currentQnStore((store) => store.qnNo)
  const setAllQn = testStore((store) => store.setAllQn)
  const qn = allQn?.[qnNo]
  const text = qn?.markedAnswer

  const onChange = useCallback(
    (text: string) => {
      const question = allQn?.[qnNo]
      if (!question) return
      question.markedAnswer = text
      setAllQn([...allQn])
    },
    [allQn, qnNo, setAllQn],
  )

  return (
    <View>
      <Label text='Type your answer below' />
      <Input placeholder='Type your answer here' keyboardType='numeric' value={text} onChangeText={onChange} />
      {qn?.markedAnswer && (
        <TouchableOpacity className='mt-6' activeOpacity={0.6} onPress={() => onChange('')}>
          <Medium className='text text-sm underline'>Clear answer</Medium>
        </TouchableOpacity>
      )}
    </View>
  )
})

const McqOptions = React.memo(({ colorScheme }: { colorScheme: ColorScheme }) => {
  const allQn = testStore((store) => store.allQn)
  const setAllQn = testStore((store) => store.setAllQn)
  const qnNo = currentQnStore((store) => store.qnNo)
  const qn = allQn?.[qnNo]
  const options = qn?.options ?? []
  const selected = qn?.markedAnswer ? qn?.markedAnswer.charCodeAt(0) - 65 : -1

  const onSelect = useCallback(
    (i: number) => {
      if (!qn) return
      qn.markedAnswer = String.fromCharCode(65 + i)
      setAllQn([...allQn])
    },
    [allQn, qn, setAllQn],
  )

  const clearSelection = useCallback(() => {
    if (!qn) return
    qn.markedAnswer = ''
    setAllQn([...allQn])
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

const MultiCorrectOptions = React.memo(({ colorScheme }: { colorScheme: ColorScheme }) => {
  const allQn = testStore((store) => store.allQn)
  const qnNo = currentQnStore((store) => store.qnNo)
  const options = allQn?.[qnNo]?.options ?? []
  const qn = allQn?.[qnNo]
  const marked = useMemo(() => qn?.markedAnswer?.split(',') ?? [], [qn?.markedAnswer])
  const setAllQn = testStore((store) => store.setAllQn)

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
    },
    [allQn, qn, setAllQn],
  )

  const clearSelection = useCallback(() => {
    if (!qn) return
    qn.markedAnswer = ''
    setAllQn([...allQn])
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
