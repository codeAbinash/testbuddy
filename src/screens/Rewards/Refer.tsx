import BackHeader from '@screens/BackHeader'
import type { NavProps } from '@utils/types'
import { ScrollView } from 'react-native-gesture-handler'

export default function Refer({ navigation }: NavProps) {
  return (
    <>
      <BackHeader title='Referral' navigation={navigation} />
      <ScrollView contentContainerClassName='px-5 py-3 gap-5 screen-bg flex-1'></ScrollView>
    </>
  )
}
