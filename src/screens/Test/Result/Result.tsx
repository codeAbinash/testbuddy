import { RouteProp } from '@react-navigation/native'
import BackHeader from '@screens/BackHeader'
import { Medium } from '@utils/fonts'
import { StackNav } from '@utils/types'
import { View } from 'react-native'

type ParamList = {
  Result: ResultParamList
}

export type ResultParamList = {}

type ResultProps = {
  route: RouteProp<ParamList, 'Result'>
  navigation: StackNav
}

export default function Result({ navigation }: ResultProps) {
  return (
    <>
      <BackHeader title='Results' navigation={navigation} />
      <View className='flex-1 items-center justify-center'>
        <Medium>Results</Medium>
      </View>
    </>
  )
}
