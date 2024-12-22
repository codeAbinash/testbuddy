import { ColorScheme } from '@utils/types'
import { View } from 'react-native'
import MathJax from '../Math/MathJax'
import currentQnStore from '../zustand/currentQn'
import testStore from '../zustand/testStore'

export default function QuestionDisplayArea({ colorScheme }: { colorScheme: ColorScheme }) {
  const allQn = testStore((store) => store.allQn)
  const qnNo = currentQnStore((store) => store.qnNo)

  const qn = allQn?.[qnNo]?.questionContent
  const options = allQn?.[qnNo]?.options ?? []
  const op1 = options[0]?.content ?? ''
  const op2 = options[1]?.content ?? ''
  const op3 = options[2]?.content ?? ''
  const op4 = options[3]?.content ?? ''

  return (
    <View className='px-5'>
      <MathJax colorScheme={colorScheme} html={qn} />
      <MathJax colorScheme={colorScheme} html={op1} />
      <MathJax colorScheme={colorScheme} html={op2} />
      <MathJax colorScheme={colorScheme} html={op3} />
      <MathJax colorScheme={colorScheme} html={op4} />
    </View>
  )
}
