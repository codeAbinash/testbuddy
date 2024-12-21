import api from '@query/api'
import { RouteProp } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query'
import type { StackNav } from '@utils/types'
import { useColorScheme } from 'nativewind'
import { useState } from 'react'
import { View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Footer } from './Components/Footer'
import { Header } from './Components/Header'
import { ModalOptions } from './Components/ModalOptions'
import { QuestionHeading } from './Components/QuestionHeading'
import Math from './Math/MathJax'
import useAllQn from './hooks/useAllQn'
import { Question } from './types'

type ParamList = {
  Test: TestParamList
}
export type TestParamList = {
  testId: string
}
type TestProps = {
  route: RouteProp<ParamList, 'Test'>
  navigation: StackNav
}

export default function Test({ navigation, route }: TestProps) {
  const { colorScheme } = useColorScheme()
  const { testId } = route.params
  const [open, isOpen] = useState(false)

  const { data } = useQuery({
    queryKey: ['test', testId],
    queryFn: () => api.startTest({ testId }),
  })

  const [qnNo, setQnNo] = useState(0)
  const allQn: Question[] = data ? useAllQn(data) : []

  const qn = allQn?.[qnNo]?.questionContent
  const options = allQn?.[qnNo]?.options ?? []
  const op1 = options[0]?.content ?? ''
  const op2 = options[1]?.content ?? ''
  const op3 = options[2]?.content ?? ''
  const op4 = options[3]?.content ?? ''

  function handleNext() {
    setQnNo((prevQnNo) => (prevQnNo + 1) % allQn.length)
  }

  function handlePrev() {
    setQnNo((prevQnNo) => (prevQnNo - 1 + allQn.length) % allQn.length)
  }

  return (
    <>
      <Header navigation={navigation} data={data} colorScheme={colorScheme} isOpen={isOpen} />
      <ModalOptions open={open} isOpen={isOpen} />
      <ScrollView contentContainerClassName='py-3 screen-bg' contentContainerStyle={{ flexGrow: 1 }}>
        <QuestionHeading qnNo={qnNo} allQn={allQn} colorScheme={colorScheme} />
        <View className='px-3'>
          {<Math colorScheme={colorScheme} html={qn} />}
          <Math colorScheme={colorScheme} html={op1} />
          <Math colorScheme={colorScheme} html={op2} />
          <Math colorScheme={colorScheme} html={op3} />
          <Math colorScheme={colorScheme} html={op4} />
        </View>
      </ScrollView>
      <Footer qnNo={qnNo} allQn={allQn} colorScheme={colorScheme} handleNext={handleNext} handlePrev={handlePrev} />
    </>
  )
}
