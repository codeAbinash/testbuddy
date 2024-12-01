import Tailwind from '../../tailwind.config'
import type { Theme, WeatherIconsKeys } from './types'
import colors from 'tailwindcss/colors'

export const Colors = {
  inherit: 'inherit',
  current: 'currentColor',
  transparent: 'transparent',
  black: '#000',
  white: '#fff',
  accent: Tailwind.accent as unknown as string,
}

export default Colors
