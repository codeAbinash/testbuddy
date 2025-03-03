import { FC } from 'react'

import Animations from '@assets/animations/animations'
import { W } from '@utils/dimensions'
import { useColorScheme } from 'nativewind'
import { Lottie } from './Lottie'

export const Loading: FC = () => {
  const { colorScheme } = useColorScheme()
  return (
    <Lottie size={W * 0.5} source={colorScheme === 'dark' ? Animations['rocket-dark'] : Animations['rocket-light']} />
  )
}
