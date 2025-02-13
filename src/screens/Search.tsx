import type { NavProps } from '@utils/types'
import { ScrollView } from 'react-native-gesture-handler'
import BackHeader from './components/BackHeader'

export default function Search({ navigation }: NavProps) {
  return (
    <>
      <BackHeader title='Search' navigation={navigation} />
      <ScrollView contentContainerClassName='px-5 py-3 flex-1 gap-5 screen-bg'></ScrollView>
    </>
  )
}
