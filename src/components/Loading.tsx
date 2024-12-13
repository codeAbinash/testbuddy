import Animations from '@assets/animations/animations'
import { W } from '@utils/dimensions'
import { Medium } from '@utils/fonts'
import { ColorScheme } from '@utils/types'
import { View } from 'react-native'
import { Lottie } from './Lottie'

export function Loading({ colorScheme, text }: { colorScheme: ColorScheme; text?: string }) {
  return (
    <View className='screen-bg flex-1 items-center justify-between'>
      <View />
      <View className='items-center justify-center'>
        <Lottie
          size={W * 0.5}
          source={colorScheme === 'dark' ? Animations['rocket-dark'] : Animations['rocket-light']}
        />
        <Medium className='text text-center text-sm opacity-80'>{text || 'Loading...'}</Medium>
      </View>
      <View />
      <View />
    </View>
  )
}
