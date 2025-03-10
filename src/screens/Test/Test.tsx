import { RouteProp } from '@react-navigation/native'
import type { StackNav } from '@utils/types'
import { timeDiffFromNow } from '@utils/utils'
import { useColorScheme } from 'nativewind'
import { useEffect } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { Footer } from './Components/Footer'
import { Header } from './Components/Header'
import { ModalOptions } from './Components/ModalOptions/ModalOptions'
import QuestionDisplayArea from './Components/QuestionDisplayArea'
import { QuestionHeading } from './Components/QuestionHeading'
import useTestQuery from './hooks/useTestQuery'
import useUpdateTestMutation from './hooks/useUpdateTestMutation'
import currentQnStore from './zustand/currentQn'
import testStore from './zustand/testStore'
import timeStore from './zustand/timeStore'

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
  const setTest = testStore((store) => store.setTest)
  const allQn = testStore((store) => store.allQn)
  const qnNo = currentQnStore((store) => store.qnNo)
  const lastApiCallTime = timeStore((store) => store.lastApiCallTime)
  const testSeriesId = testStore((store) => store.testData?.testSeriesId)

  const { mutate } = useUpdateTestMutation(testSeriesId!)

  const { data, isSuccess } = useTestQuery(testId)

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (isSuccess && data) setTest(data)
  }, [isSuccess])

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!allQn[qnNo]) return
      console.log('IDLE TIMER')
      mutate({
        resData: [
          {
            question: allQn[qnNo].questionId!,
            action: 'time-update',
            time: timeDiffFromNow(lastApiCallTime),
            marked: true,
            isBookMarked: allQn[qnNo].isBookMarked!,
            nextQuestion: allQn[qnNo + 1]?.questionId!,
          },
        ],
        testSeriesId: testSeriesId!,
      })
    }, 50000)
    return () => clearTimeout(timer)
  }, [lastApiCallTime])

  return (
    <>
      <Header navigation={navigation} colorScheme={colorScheme} testId={testId} mode='test' />
      <ModalOptions colorScheme={colorScheme} testId={testId} mode='test' />
      <ScrollView contentContainerClassName='py-3 bg-screen' contentContainerStyle={{ flexGrow: 1 }}>
        <QuestionHeading qnNo={qnNo} allQn={allQn} colorScheme={colorScheme} />
        <QuestionDisplayArea colorScheme={colorScheme} mode='test' />
      </ScrollView>
      <Footer colorScheme={colorScheme} mode='test' />
    </>
  )
}
