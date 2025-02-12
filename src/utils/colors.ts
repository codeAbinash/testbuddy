import colors from 'tailwindcss/colors'
import Tailwind from '../../tailwind.config'

export const Colors = {
  inherit: 'inherit',
  current: 'currentColor',
  transparent: 'transparent',
  black: '#000',
  white: '#fff',
  accent: Tailwind.accent as unknown as string,
}

export const allColors = [
  colors.green[500],
  colors.blue[500],
  colors.purple[500],
  colors.pink[500],
  colors.red[500],
  colors.orange[500],
  colors.yellow[500],
  colors.lime[500],
  colors.emerald[500],
  colors.teal[500],
  colors.cyan[500],
  colors.sky[500],
  colors.indigo[500],
  colors.violet[500],
  colors.fuchsia[500],
  colors.rose[500],
  colors.zinc[500],
]

export default Colors
