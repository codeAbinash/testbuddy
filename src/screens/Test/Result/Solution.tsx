import { RouteProp } from '@react-navigation/native'
import { StackNav } from '@utils/types'
import { useColorScheme } from 'nativewind'
import { useEffect } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { Footer } from '../Components/Footer'
import { Header } from '../Components/Header'
import { ModalOptions } from '../Components/ModalOptions/ModalOptions'
import QuestionDisplayArea from '../Components/QuestionDisplayArea'
import { QuestionHeading } from '../Components/QuestionHeading'
import useTestQuery from '../hooks/useTestQuery'
import currentQnStore from '../zustand/currentQn'
import testStore from '../zustand/testStore'

type ParamList = {
  Solution: SolutionParamList
}

export type SolutionParamList = {
  testId: string
}

type SolutionProps = {
  route: RouteProp<ParamList, 'Solution'>
  navigation: StackNav
}

export default function Solution({ navigation, route }: SolutionProps) {
  const { testId } = route.params
  const { colorScheme } = useColorScheme()
  const setTest = testStore((store) => store.setTest)
  const qnNo = currentQnStore((store) => store.qnNo)
  const allQn = testStore((store) => store.allQn)
  const { data, isSuccess } = useTestQuery(testId)

  useEffect(() => {
    if (isSuccess && data) setTest(data)
  }, [isSuccess])

  useEffect(() => {
    navigation.navigate('Analysis', { testId })
  }, [])

  return (
    <>
      <Header navigation={navigation} colorScheme={colorScheme} testId={testId} mode='solution' />
      <ModalOptions colorScheme={colorScheme} mode='solution' testId={testId} />
      <ScrollView contentContainerClassName='py-3 screen-bg' contentContainerStyle={{ flexGrow: 1 }}>
        <QuestionHeading qnNo={qnNo} allQn={allQn} colorScheme={colorScheme} />
        <QuestionDisplayArea colorScheme={colorScheme} mode='solution' />
      </ScrollView>
      <Footer colorScheme={colorScheme} mode='solution' />
    </>
  )
}
