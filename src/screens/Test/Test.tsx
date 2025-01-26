import api from '@query/api'
import { RouteProp } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query'
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
  const setQnNo = currentQnStore((store) => store.setQnNo)
  const lastApiCallTime = timeStore((store) => store.lastApiCallTime)
  const testSeriesId = testStore((store) => store.testData?.testSeriesId)

  const { mutate } = useUpdateTestMutation(testSeriesId!)

  const { data, isSuccess } = useQuery({
    queryKey: ['test', testId],
    queryFn: () => api.startTest({ testId }),
  })

  useEffect(() => {}, [testId])

  useEffect(() => {
    if (isSuccess && data) setTest(data)
  }, [isSuccess])

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
    return () => clearInterval(timer)
  }, [lastApiCallTime])

  function handleNext() {
    setQnNo((qnNo + 1) % allQn.length)
  }

  function handlePrev() {
    setQnNo((qnNo - 1 + allQn.length) % allQn.length)
  }

  return (
    <>
      <Header navigation={navigation} colorScheme={colorScheme} />
      <ModalOptions colorScheme={colorScheme} />
      <ScrollView contentContainerClassName='py-3 screen-bg' contentContainerStyle={{ flexGrow: 1 }}>
        <QuestionHeading qnNo={qnNo} allQn={allQn} colorScheme={colorScheme} />
        <QuestionDisplayArea colorScheme={colorScheme} />
      </ScrollView>
      <Footer colorScheme={colorScheme} handleNext={handleNext} handlePrev={handlePrev} />
    </>
  )
}
