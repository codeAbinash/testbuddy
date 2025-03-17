import Animations from '@assets/animations/animations'
import { H, W } from '@utils/dimensions'
import { Medium } from '@utils/fonts'
import { FC } from 'react'
import { View } from 'react-native'
import { Lottie } from './Lottie'

export const ErrorDisplay: FC = () => {
  return <Lottie size={W * 0.5} source={Animations.astronaut} />
}

type ErrorFullScreenProps = {
  text?: string
}
export const ErrorFullScreen: FC<ErrorFullScreenProps> = ({ text }) => {
  return (
    <View className='flex-1 items-center justify-center' style={{ height: H * 0.7 }}>
      <ErrorDisplay />
      {text && <Medium className='text mt-3 text-center text-sm opacity-90'>{text}</Medium>}
    </View>
  )
}
