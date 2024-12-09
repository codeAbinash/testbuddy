import { W } from '@utils/dimensions'
import { Medium } from '@utils/fonts'
import type { NavProps } from '@utils/types'
import LottieView from 'lottie-react-native'
import { View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import BackHeader from './BackHeader'

export default function Streaks({ navigation }: NavProps) {
  return (
    <>
      <BackHeader title='Streaks' navigation={navigation} />
      <ScrollView contentContainerClassName='px-5 py-3 gap-5 screen-bg flex-1 ie'>
        <View className='m-auto'>
          <LottieView
            source={require('../assets/animations/fire.lottie')}
            style={{ height: W * 0.65, width: W * 0.65, marginHorizontal: 'auto' }}
            autoPlay
            loop
            hardwareAccelerationAndroid
            cacheComposition
          />
          <Medium className='text mb-52 mt-5 text-center opacity-70'>You have no notifications yet.</Medium>
        </View>
      </ScrollView>
    </>
  )
}
