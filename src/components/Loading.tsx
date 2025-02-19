import Animations from '@assets/animations/animations'
import { W } from '@utils/dimensions'
import { ColorScheme } from '@utils/types'
import { Lottie } from './Lottie'

export function Loading({ colorScheme }: { colorScheme: ColorScheme }) {
  return (
    <Lottie size={W * 0.5} source={colorScheme === 'dark' ? Animations['rocket-dark'] : Animations['rocket-light']} />
  )
}
