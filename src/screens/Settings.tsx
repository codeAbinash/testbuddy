import { ScrollView } from 'react-native-gesture-handler'
import BackHeader from './components/BackHeader'

export default function Settings() {
  return (
    <>
      <BackHeader title='Settings' />
      <ScrollView contentContainerClassName='px-5 py-3 gap-5 bg-screen'></ScrollView>
    </>
  )
}
