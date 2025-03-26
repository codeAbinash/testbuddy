import Animations from '@assets/animations/animations'
import { Lottie } from '@components/Lottie'
import { W } from '@utils/dimensions'
import { Medium } from '@utils/fonts'
import { View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import BackHeader from './components/BackHeader'

export default function Streaks() {
  return (
    <>
      <BackHeader title='Streaks' />
      <ScrollView contentContainerClassName='px-5 py-3 gap-5 bg-screen flex-1 ie'>
        <View className='m-auto'>
          <Lottie source={Animations.fire} size={W * 0.65} />
          <Medium className='text mb-52 mt-5 text-center opacity-70'>You have no streaks yet.</Medium>
        </View>
      </ScrollView>
    </>
  )
}
