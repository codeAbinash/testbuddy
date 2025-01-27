import { RouteProp } from '@react-navigation/native'
import BackHeader from '@screens/BackHeader'
import { StackNav } from '@utils/types'
import { useEffect } from 'react'
import { ScrollView } from 'react-native-gesture-handler'

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
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Analysis', { testId })
    }, 0)
    return () => clearTimeout(timer)
  }, [])
  return (
    <>
      <BackHeader title='Solution' navigation={navigation} />
      <ScrollView className='screen-bg flex-1 gap-5 px-5 py-5'></ScrollView>
    </>
  )
}
