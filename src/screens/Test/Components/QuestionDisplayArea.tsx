import { ColorScheme } from '@utils/types'
import { useEffect } from 'react'
import { View } from 'react-native'
import MathJax from '../Math/MathJax'
import currentQnStore from '../zustand/currentQn'
import testStore from '../zustand/testStore'
import McqOptions from './McqOptions'
import MultiCorrectOptions from './MultiCorrectOptions'
import NumericalOptions from './NumericalOptions'

export default function QuestionDisplayArea({ colorScheme }: { colorScheme: ColorScheme }) {
  const allQn = testStore((store) => store.allQn)
  const qnNo = currentQnStore((store) => store.qnNo)
  const qn = allQn?.[qnNo]?.questionContent
  const qnType = allQn?.[qnNo]?.questionType
  const setAllQn = testStore((store) => store.setAllQn)
  const lastOpenedQn = currentQnStore((store) => store.lastOpenedQn)

  useEffect(() => {
    if (!qn) return
    if (allQn[qnNo]) allQn[qnNo].visited = true
    setAllQn([...allQn])
  }, [qn])

  useEffect(() => {
    console.log('QUESTION CHANGE', lastOpenedQn)
  }, [lastOpenedQn])

  return (
    <View className='px-5 pb-14'>
      <MathJax colorScheme={colorScheme} html={qn} />

      {qnType === 'mcq' && <McqOptions colorScheme={colorScheme} />}
      {qnType === 'numerical' && <NumericalOptions colorScheme={colorScheme} />}
      {qnType === 'multi-correct' && <MultiCorrectOptions colorScheme={colorScheme} />}
    </View>
  )
}
