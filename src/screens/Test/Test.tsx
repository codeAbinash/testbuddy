import Btn from '@components/Button'
import { PaddingBottom } from '@components/SafePadding'
import api from '@query/api'
import { RouteProp } from '@react-navigation/native'
import BackHeader from '@screens/BackHeader'
import { useQuery } from '@tanstack/react-query'
import type { StackNav } from '@utils/types'
import { useColorScheme } from 'nativewind'
import { useState } from 'react'
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

// const useQuestion = (data: any, qnNo: number) => {
//   const [qn, setQn] = useState('')
//   useEffect(() => {
//     setQn('')
//     const timer = setTimeout(() => setQn(data?.test.sections[0]?.questions[qnNo]?.questionContent || ''), 0)
//     return () => clearTimeout(timer)
//   }, [qnNo, data])
//   return [qn as string, setQn]
// }

export default function Test({ navigation, route }: TestProps) {
  const { colorScheme } = useColorScheme()
  const { testId } = route.params
  const [open, isOpen] = useState(false)

  const { data } = useQuery({
    queryKey: ['test', testId],
    queryFn: () => api.startTest({ testId }),
  })

  const [qnNo, setQnNo] = useState(0)
  // const qn = useMemo(() => data?.test.sections[0]?.questions[qnNo]?.questionContent, [data, qnNo])
  // const qn = data?.test.sections[0]?.questions[qnNo]?.questionContent

  // const [qn] = useQuestion(data, qnNo) as [string]
  const qn = data?.test.sections[0]?.questions[qnNo]?.questionContent || ''
  const op1 = data?.test.sections[0]?.questions[qnNo]?.options[0]?.content || ''
  const op2 = data?.test.sections[0]?.questions[qnNo]?.options[1]?.content || ''
  const op3 = data?.test.sections[0]?.questions[qnNo]?.options[2]?.content || ''
  const op4 = data?.test.sections[0]?.questions[qnNo]?.options[3]?.content || ''

  return (
    <>
      <BackHeader
        title={data?.test.testTitle || 'Loading...'}
        navigation={navigation}
        Right={<MoreOption colorScheme={colorScheme} onPress={() => isOpen(true)} />}
      />
      <ModalOptions open={open} isOpen={isOpen} />
      <ScrollView contentContainerClassName='px-5 py-3 gap-10 screen-bg' contentContainerStyle={{ flexGrow: 1 }}>
        <View className='gap-5'>
          {<Math colorScheme={colorScheme} html={qn} />}
          <Math colorScheme={colorScheme} html={op1} />
          <Math colorScheme={colorScheme} html={op2} />
          <Math colorScheme={colorScheme} html={op3} />
          <Math colorScheme={colorScheme} html={op4} />
          <Btn title='Prev' onPress={() => setQnNo((prev) => prev - 1)} />
          <Btn title='Next' onPress={() => setQnNo((prev) => prev + 1)} />
        </View>
        <PaddingBottom />
      </ScrollView>
    </>
  )
}
