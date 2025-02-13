import BackHeader from '@screens/components/BackHeader'
import type { NavProps } from '@utils/types'
import { ScrollView } from 'react-native-gesture-handler'

export default function MyRewards({ navigation }: NavProps) {
  return (
    <>
      <BackHeader title='My Rewards' navigation={navigation} />
      <ScrollView contentContainerClassName='px-5 py-3 gap-5 screen-bg flex-1'></ScrollView>
    </>
  )
}
