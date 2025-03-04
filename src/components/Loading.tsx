import { FC } from 'react'

import Animations from '@assets/animations/animations'
import { H, W } from '@utils/dimensions'
import { Medium } from '@utils/fonts'
import { useColorScheme } from 'nativewind'
import { View } from 'react-native'
import { Lottie } from './Lottie'

export const Loading: FC = () => {
  const { colorScheme } = useColorScheme()
  return (
    <Lottie size={W * 0.5} source={colorScheme === 'dark' ? Animations['rocket-dark'] : Animations['rocket-light']} />
  )
}

type LoadingFullScreenProps = {
  text?: string
}
export const LoadingFullScreen: FC<LoadingFullScreenProps> = ({ text }) => {
  return (
    <View className='flex-1 items-center justify-center' style={{ height: H * 0.7 }}>
      <Loading />
      {text && <Medium className='text text-sm opacity-90'>{text}</Medium>}
    </View>
  )
}
