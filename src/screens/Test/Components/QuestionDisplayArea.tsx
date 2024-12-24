import Input from '@components/Input'
import Label from '@components/Label'
import { Medium } from '@utils/fonts'
import { ColorScheme } from '@utils/types'
import { TouchableOpacity, View } from 'react-native'
import MathJax from '../Math/MathJax'
import currentQnStore from '../zustand/currentQn'
import testStore from '../zustand/testStore'

export default function QuestionDisplayArea({ colorScheme }: { colorScheme: ColorScheme }) {
  const allQn = testStore((store) => store.allQn)
  const qnNo = currentQnStore((store) => store.qnNo)
  const qn = allQn?.[qnNo]?.questionContent
  const qnType = allQn?.[qnNo]?.questionType
  return (
    <View className='px-5'>
      <MathJax colorScheme={colorScheme} html={qn} />

      {qnType === 'mcq' && <McqOptions colorScheme={colorScheme} />}
      {qnType === 'numerical' && <NumericalOptions colorScheme={colorScheme} />}
      {qnType === 'multi-correct' && <MultiCorrectOptions colorScheme={colorScheme} />}
    </View>
  )
}

function NumericalOptions({ colorScheme }: { colorScheme: ColorScheme }) {
  const allQn = testStore((store) => store.allQn)
  const qnNo = currentQnStore((store) => store.qnNo)
  const setAllQn = testStore((store) => store.setAllQn)
  const qn = allQn?.[qnNo]
  const text = qn?.markedAnswer

  function onChange(text: string) {
    const question = allQn?.[qnNo]
    if (!question) return
    question.markedAnswer = text
    setAllQn([...allQn])
  }

  return (
    <View>
      <Label text='Type your answer below' />
      <Input placeholder='Type your answer here' keyboardType='numeric' value={text} onChangeText={onChange} />
    </View>
  )
}

function McqOptions({ colorScheme }: { colorScheme: ColorScheme }) {
  const allQn = testStore((store) => store.allQn)
  const setAllQn = testStore((store) => store.setAllQn)
  const qnNo = currentQnStore((store) => store.qnNo)
  const qn = allQn?.[qnNo]
  const options = qn?.options ?? []
  const selected = qn?.markedAnswer ? qn?.markedAnswer.charCodeAt(0) - 65 : -1

  function onSelect(i: number) {
    const question = allQn?.[qnNo]
    if (!question) return
    question.markedAnswer = String.fromCharCode(65 + i)
    setAllQn([...allQn])
  }

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
    </View>
  )
}

function MultiCorrectOptions({ colorScheme }: { colorScheme: ColorScheme }) {
  const allQn = testStore((store) => store.allQn)
  const qnNo = currentQnStore((store) => store.qnNo)
  const qnType = allQn?.[qnNo]?.questionType
  const options = allQn?.[qnNo]?.options ?? []

  if (qnType !== 'multi-correct') return null

  return (
    <View>
      <Medium className='mb-5 rounded-xl bg-green-500/10 py-3.5 text-center text-sm text-green-500'>
        Select all correct options
      </Medium>
      {options.map((op, i) => (
        <MathJax key={i} colorScheme={colorScheme} html={op.content} />
      ))}
    </View>
  )
}
