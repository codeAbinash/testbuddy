import { ArrowLeft01StrokeRoundedIcon } from '@assets/icons/icons'
import { SmallBtn } from '@components/Button'
import { PaddingBottom, PaddingTop } from '@components/SafePadding'
import api from '@query/api'
import { RouteProp } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query'
import { SemiBold } from '@utils/fonts'
import type { ColorScheme, StackNav } from '@utils/types'
import { useColorScheme } from 'nativewind'
import { useMemo, useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import colors from 'tailwindcss/colors'
import { ModalOptions } from './Components/ModalOptions'
import { MoreOption } from './Components/MoreOption'
import { QuestionHeading } from './Components/QuestionHeading'
import { SectionDetails } from './Components/SectionDetails'
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
      <Header navigation={navigation} data={data} colorScheme={colorScheme} isOpen={isOpen} />
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

function Header({
  navigation,
  data,
  colorScheme,
  isOpen,
}: {
  navigation: StackNav
  data: any
  colorScheme: ColorScheme
  isOpen: (open: boolean) => void
}) {
  return (
    <View className='bg-white dark:bg-zinc-950'>
      <PaddingTop />
      <View className='flex-row items-center' style={{ gap: 10 }}>
        <TouchableOpacity className='p-2 pb-2.5 pr-0' onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <ArrowLeft01StrokeRoundedIcon
            width={26}
            height={26}
            color={colorScheme === 'dark' ? colors.zinc[200] : colors.zinc[800]}
          />
        </TouchableOpacity>
        <View className='flex-1 flex-col'>
          <View className='flex-row justify-between gap-1'>
            <SemiBold
              style={{ fontSize: 11, flex: 1, lineHeight: 16 }}
              className='-mt-0.5 text-zinc-800 dark:text-zinc-200'
              numberOfLines={2}
            >
              {data?.test.testTitle || 'Loading...'}{' '}
              <SemiBold className='capitalize text-zinc-500'>({data?.test.language})</SemiBold>
            </SemiBold>
            <View className='justify-center'>
              <SmallBtn title='Submit' style={{ paddingHorizontal: 16, paddingVertical: 4.5, borderRadius: 10 }} />
            </View>
          </View>
        </View>
        <MoreOption colorScheme={colorScheme} onPress={() => isOpen(true)} />
      </View>
    </View>
  )
}
