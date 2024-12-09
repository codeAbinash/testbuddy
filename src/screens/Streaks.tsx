import { W } from '@utils/dimensions'
import { Medium } from '@utils/fonts'
import type { NavProps } from '@utils/types'
import { View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import BackHeader from './BackHeader'
import { Lottie } from '@components/Lottie'
import Animations from '@assets/animations/animations'

export default function Streaks({ navigation }: NavProps) {
  return (
    <>
      <BackHeader title='Streaks' navigation={navigation} />
      <ScrollView contentContainerClassName='px-5 py-3 gap-5 screen-bg flex-1 ie'>
        <View className='m-auto'>
          <Lottie source={Animations.fire} size={W * 0.65} />
          <Medium className='text mb-52 mt-5 text-center opacity-70'>You have no streaks yet.</Medium>
        </View>
      </ScrollView>
    </>
  )
}
