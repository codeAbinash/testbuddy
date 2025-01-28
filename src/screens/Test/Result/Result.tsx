import { RouteProp } from '@react-navigation/native'
import BackHeader from '@screens/BackHeader'
import { StackNav } from '@utils/types'
import { ScrollView } from 'react-native-gesture-handler'

type ParamList = {
  Analysis: ResultParamList
}

export type ResultParamList = {
  testId: string
}

type ResultProps = {
  route: RouteProp<ParamList, 'Analysis'>
  navigation: StackNav
}

export default function Solution({ navigation }: ResultProps) {
  return (
    <>
      <BackHeader title='Results' navigation={navigation} />
      <ScrollView className='screen-bg flex-1 gap-5 px-5 py-5'></ScrollView>
    </>
  )
}
