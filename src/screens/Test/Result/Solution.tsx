import { AnalyticsUpStrokeRoundedIcon } from '@assets/icons/icons'
import Press from '@components/Press'
import { RouteProp, useNavigation } from '@react-navigation/native'
import { Bold } from '@utils/fonts'
import { ColorScheme, StackNav } from '@utils/types'
import { useColorScheme } from 'nativewind'
import { useEffect } from 'react'
import { View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Footer } from '../Components/Footer'
import { Header } from '../Components/Header'
import { ModalOptions } from '../Components/ModalOptions/ModalOptions'
import QuestionDisplayArea from '../Components/QuestionDisplayArea'
import { QuestionHeading } from '../Components/QuestionHeading'
import useTestQuery from '../hooks/useTestQuery'
import MathJax from '../Math/MathJax'
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

  return (
    <>
      <Header navigation={navigation} colorScheme={colorScheme} testId={testId} mode='solution' />
      <ModalOptions colorScheme={colorScheme} mode='solution' testId={testId} />
      <ScrollView contentContainerClassName='py-3 screen-bg' contentContainerStyle={{ flexGrow: 1, paddingBottom: 70 }}>
        <QuestionHeading qnNo={qnNo} allQn={allQn} colorScheme={colorScheme} />
        <QuestionDisplayArea colorScheme={colorScheme} mode='solution' />
        <Explanation colorScheme={colorScheme} />
      </ScrollView>
      <FabButton testId={testId} />
      <Footer colorScheme={colorScheme} mode='solution' />
    </>
  )
}

function Explanation({ colorScheme }: { colorScheme: ColorScheme }) {
  const qnNo = currentQnStore((store) => store.qnNo)
  const allQn = testStore((store) => store.allQn)
  return (
    <View className='mt-7 px-5'>
      <Bold className='text mb-3 text-lg'>Explanation</Bold>
      <MathJax html={allQn[qnNo]?.answerExplanation} colorScheme={colorScheme} />
    </View>
  )
}

const FabButton = ({ testId }: { testId: string }) => {
  const navigation = useNavigation<StackNav>()
  return (
    <View className='absolute bottom-32 right-5 z-10'>
      <Press
        style={{
          shadowColor: '#000',
          shadowOffset: {
            width: 2,
            height: 2,
          },
          elevation: 6,
          shadowOpacity: 0.5,
          height: 60,
          width: 60,
        }}
        onPress={() => navigation.navigate('Analysis', { testId })}
        activeOpacity={0.9}
        activeScale={0.95}
        className='items-center justify-center rounded-full bg-accent'
      >
        <AnalyticsUpStrokeRoundedIcon color={'white'} height={25} width={25} />
      </Press>
    </View>
  )
}
