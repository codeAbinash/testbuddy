import { ScrollView } from 'react-native-gesture-handler'
import BackHeader from './components/BackHeader'

export default function Search() {
  return (
    <>
      <BackHeader title='Search' />
      <ScrollView contentContainerClassName='px-5 py-3 flex-1 gap-5 bg-screen'></ScrollView>
    </>
  )
}
