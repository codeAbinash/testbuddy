import { TouchableOpacity, type TouchableOpacityProps } from 'react-native'

import colors from 'tailwindcss/colors'

import { ArrowLeft01StrokeRoundedIcon } from '@assets/icons/icons'
import type { ColorScheme } from '@utils/types'

type BackButtonProps = TouchableOpacityProps & {
  colorScheme: ColorScheme
}

export default function BackButton({ colorScheme, ...rest }: BackButtonProps) {
  return (
    <TouchableOpacity className='p-2 pr-1' activeOpacity={0.7} {...rest}>
      <ArrowLeft01StrokeRoundedIcon
        width={26}
        height={26}
        color={colorScheme === 'dark' ? colors.zinc[200] : colors.zinc[800]}
      />
    </TouchableOpacity>
  )
}
