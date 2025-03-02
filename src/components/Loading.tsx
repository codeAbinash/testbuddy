import Animations from '@assets/animations/animations'
import { W } from '@utils/dimensions'
import { ColorScheme } from '@utils/types'
import { Lottie } from './Lottie'

// TODO: use colorScheme from nativewind instead of prop if it is not specified
export function Loading({ colorScheme = 'light' }: { colorScheme?: ColorScheme }) {
  return (
    <Lottie size={W * 0.5} source={colorScheme === 'dark' ? Animations['rocket-dark'] : Animations['rocket-light']} />
  )
}
