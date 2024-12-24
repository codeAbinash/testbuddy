import popupStore from '@/zustand/popupStore'
import api from '@query/api'
import { RouteProp } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query'
import type { StackNav } from '@utils/types'
import { useColorScheme } from 'nativewind'
import { useEffect } from 'react'
import { BackHandler } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Footer } from './Components/Footer'
import { Header } from './Components/Header'
import { ModalOptions } from './Components/ModalOptions/ModalOptions'
import QuestionDisplayArea from './Components/QuestionDisplayArea'
import { QuestionHeading } from './Components/QuestionHeading'
import currentQnStore from './zustand/currentQn'
import testStore from './zustand/testStore'

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

  const setTestData = testStore((store) => store.setTestData)
  const allQn = testStore((store) => store.allQn)
  const qnNo = currentQnStore((store) => store.qnNo)
  const setQnNo = currentQnStore((store) => store.setQnNo)
  const alert = popupStore((store) => store.alert)
  const clearTestData = testStore((store) => store.clearTestData)

  const { data } = useQuery({
    queryKey: ['test', testId],
    queryFn: () => api.startTest({ testId }),
  })

  useEffect(() => {
    if (data) setTestData(data)
  }, [data, setTestData])

  useEffect(() => {
    const onBackPress = () => {
      alert('Exit test?', 'Do you want to exit the test?', [
        { text: 'Cancel' },
        {
          text: 'YES',
          onPress: () => {
            navigation.goBack()
            clearTestData()
            setQnNo(0)
          },
        },
      ])
      return true
    }
    const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPress)
    return () => backHandler.remove()
  }, [])

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
