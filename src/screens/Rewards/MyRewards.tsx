import BackHeader from '@screens/components/BackHeader'
import { ScrollView } from 'react-native-gesture-handler'

export default function MyRewards() {
  return (
    <>
      <BackHeader title='My Rewards' />
      <ScrollView contentContainerClassName='px-5 py-3 gap-5 bg-screen flex-1'></ScrollView>
    </>
  )
}
