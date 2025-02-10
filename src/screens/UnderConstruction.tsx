import Animations from '@assets/animations/animations'
import { Lottie } from '@components/Lottie'
import { W } from '@utils/dimensions'
import { SemiBold } from '@utils/fonts'
import { View } from 'react-native'

export default function UnderConstruction() {
  return (
    <View className='flex-1 items-center justify-center'>
      <Lottie source={Animations.update} style={{ width: W * 0.8, height: W * 0.8 }} />
      <SemiBold className='text mt-5 text-center opacity-80'>Under Construction</SemiBold>
    </View>
  )
}
