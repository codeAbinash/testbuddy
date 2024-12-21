import { Clock01Icon } from '@assets/icons/icons'
import { SmallBtn } from '@components/Button'
import { PaddingBottom } from '@components/SafePadding'
import api from '@query/api'
import { RouteProp } from '@react-navigation/native'
import BackHeader from '@screens/BackHeader'
import { useQuery } from '@tanstack/react-query'
import { Medium } from '@utils/fonts'
import type { StackNav } from '@utils/types'
import { useColorScheme } from 'nativewind'
import { useMemo, useState } from 'react'
import { View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import colors from 'tailwindcss/colors'
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
      <SectionDetails qnNo={qnNo} allQn={allQn} />
      <ScrollView contentContainerClassName='py-3 screen-bg' contentContainerStyle={{ flexGrow: 1 }}>
        <QuestionHeading qnNo={qnNo} allQn={allQn} />
        <View className='px-3'>
          {<Math colorScheme={colorScheme} html={qn} />}
          <Math colorScheme={colorScheme} html={op1} />
          <Math colorScheme={colorScheme} html={op2} />
          <Math colorScheme={colorScheme} html={op3} />
          <Math colorScheme={colorScheme} html={op4} />
        </View>
      </ScrollView>
      <View>
        <View className='flex-row gap-2.5 px-4 pb-1.5 pt-2.5'>
          <SmallBtn variant='secondary' style={{ flex: 0.7 }} title='Previous' onPress={handlePrev} />
          <SmallBtn variant='secondary' style={{ flex: 1 }} title='Remove from review' />
          <SmallBtn style={{ flex: 0.7 }} title='Next' onPress={handleNext} />
        </View>
        <PaddingBottom />
      </View>
    </>
  )
}

function QuestionHeading({ qnNo, allQn }: { qnNo: number; allQn: any }) {
  return (
    <View className='flex-row justify-between px-6'>
      <Medium className='text text-sm'>
        Question: {qnNo + 1}
        {'  '}|{'  '}Marks: <Medium className='text-green-500'>+{allQn[qnNo]?.marks}</Medium>{' '}
        <Medium className='text-red-500'>-{allQn[qnNo]?.negMarks}</Medium>
      </Medium>
      <View className='flex-row items-center justify-center gap-1.5'>
        <Clock01Icon width={14} height={14} color={colors.zinc[500]} />
        <Medium className='text mb-0.5 text-sm'>05:01:05</Medium>
      </View>
    </View>
  )
}

function SectionDetails({ qnNo, allQn }: { qnNo: number; allQn: any }) {
  return (
    <View className='flex-row items-center justify-between bg-white px-5 pb-2 dark:bg-zinc-950'>
      <Medium className='text text-sm capitalize'>
        Section {allQn[qnNo]?.section}: {allQn[qnNo]?.subject} | Attempted 5/90
      </Medium>
      <SmallBtn title='Submit' style={{ paddingHorizontal: 17, paddingVertical: 5, borderRadius: 8 }}></SmallBtn>
    </View>
  )
}
