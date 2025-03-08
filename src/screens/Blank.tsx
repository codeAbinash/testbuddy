import type { NavProps } from '@utils/types'
import { ScrollView } from 'react-native-gesture-handler'
import BackHeader from './components/BackHeader'

export default function Blank({ navigation }: NavProps) {
  return (
    <>
      <BackHeader title='Blank Page' navigation={navigation} />
      <ScrollView contentContainerClassName='px-5 py-3 gap-5 bg-screen flex-1'></ScrollView>
    </>
  )
}
