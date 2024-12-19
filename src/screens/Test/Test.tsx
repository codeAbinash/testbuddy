import Btn from '@components/Button'
import api from '@query/api'
import { RouteProp } from '@react-navigation/native'
import BackHeader from '@screens/BackHeader'
import { useQuery } from '@tanstack/react-query'
import type { StackNav } from '@utils/types'
import { useColorScheme } from 'nativewind'
import { useEffect, useState } from 'react'
import { ScrollView, View } from 'react-native'
import { ModalOptions } from './Components/ModalOptions'
import { MoreOption } from './Components/MoreOption'
import Math from './MathJax'

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

const useQuestion = (data: any, qnNo: number) => {
  const [qn, setQn] = useState('')
  useEffect(() => {
    setQn('')
    const timer = setTimeout(() => {
      setQn(data?.test.sections[1]?.questions[qnNo]?.questionContent || '')
    }, 0)
    return () => clearTimeout(timer)
  }, [qnNo, data])

  return [qn as string, setQn]
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
  // const qn = useMemo(() => data?.test.sections[0]?.questions[qnNo]?.questionContent, [data, qnNo])
  // const qn = data?.test.sections[0]?.questions[qnNo]?.questionContent

  const [qn] = useQuestion(data, qnNo) as [string]

  // const op1 = data?.test.sections[0]?.questions[qnNo]?.options[0]?.content || ''
  // const op2 = data?.test.sections[0]?.questions[qnNo]?.options[1]?.content || ''
  // const op3 = data?.test.sections[0]?.questions[qnNo]?.options[2]?.content || ''
  // const op4 = data?.test.sections[0]?.questions[qnNo]?.options[3]?.content || ''

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
          {qn && <Math scalesPageToFit={true} bounces={false} scrollEnabled={false} html={qn} overScrollMode='never' />}
          {/* <Math scalesPageToFit={true} bounces={false} scrollEnabled={false} html={op1} overScrollMode='never' />
          <Math scalesPageToFit={true} bounces={false} scrollEnabled={false} html={op2} overScrollMode='never' />
          <Math scalesPageToFit={true} bounces={false} scrollEnabled={false} html={op3} overScrollMode='never' />
          <Math scalesPageToFit={true} bounces={false} scrollEnabled={false} html={op4} overScrollMode='never' /> */}
          <Btn title='Prev' onPress={() => setQnNo((prev) => prev - 1)} />
          <Btn title='Next' onPress={() => setQnNo((prev) => prev + 1)} />
          <Math
            scalesPageToFit={true}
            bounces={false}
            scrollEnabled={false}
            html={'<h1>Hello World</h1>'}
            overScrollMode='never'
          />
        </View>
      </ScrollView>
    </>
  )
}
