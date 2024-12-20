import Btn from '@components/Button'
import { PaddingBottom } from '@components/SafePadding'
import api from '@query/api'
import { RouteProp } from '@react-navigation/native'
import BackHeader from '@screens/BackHeader'
import { useQuery } from '@tanstack/react-query'
import type { StackNav } from '@utils/types'
import { useColorScheme } from 'nativewind'
import { useMemo, useState } from 'react'
import { View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { ModalOptions } from './Components/ModalOptions'
import { MoreOption } from './Components/MoreOption'
import Math from './Math/MathJax'

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

function useAllQn(data: any) {
  return useMemo(
    () => [
      ...(data?.test.sections[0]?.questions || []),
      ...(data?.test.sections[1]?.questions || []),
      ...(data?.test.sections[2]?.questions || []),
    ],
    [data],
  )
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
  const allQn = useAllQn(data)

  const qn = allQn[qnNo]?.questionContent
  const op1 = allQn[qnNo]?.options[0]?.content
  const op2 = allQn[qnNo]?.options[1]?.content
  const op3 = allQn[qnNo]?.options[2]?.content
  const op4 = allQn[qnNo]?.options[3]?.content

  function handleNext() {
    setQnNo((prevQnNo) => (prevQnNo + 1) % allQn.length)
  }

  function handlePrev() {
    setQnNo((prevQnNo) => (prevQnNo - 1 + allQn.length) % allQn.length)
  }

  return (
    <>
      <BackHeader
        title={data?.test.testTitle || 'Loading...'}
        navigation={navigation}
        Right={<MoreOption colorScheme={colorScheme} onPress={() => isOpen(true)} />}
      />
      <ModalOptions open={open} isOpen={isOpen} />
      <ScrollView contentContainerClassName='py-3 gap-5 screen-bg' contentContainerStyle={{ flexGrow: 1 }}>
        <View className='px-3'>
          {<Math colorScheme={colorScheme} html={qn} />}
          <Math colorScheme={colorScheme} html={op1} />
          <Math colorScheme={colorScheme} html={op2} />
          <Math colorScheme={colorScheme} html={op3} />
          <Math colorScheme={colorScheme} html={op4} />
        </View>
        <View className='gap-5 px-5'>
          <Btn title='Prev' onPress={handlePrev} />
          <Btn title='Next' onPress={handleNext} />
        </View>
        <PaddingBottom />
      </ScrollView>
    </>
  )
}
