import colors from 'tailwindcss/colors'

import { ThumbsUpIcon, ThumbsUpStrokeRoundedIcon, UnfoldLessStrokeRoundedIcon } from '@assets/icons/icons'
import Press from '@components/Press'
import { SemiBold } from '@utils/fonts'
import type { ColorScheme } from '@utils/types'
import { nFormatter } from '@utils/utils'

type ThumbsIconProps = {
  isLiked: boolean
  colorScheme: ColorScheme
  likeCount: number
}

const iconSize = 20

export default function ThumbsIcon({ isLiked, colorScheme, likeCount = 0 }: ThumbsIconProps) {
  const color = colorScheme === 'dark' ? colors.zinc[200] : colors.zinc[800]
  return (
    <Press className='flex-row items-center justify-center pb-3.5 pl-2 pr-4 pt-2' style={{ gap: 5 }} activeScale={0.93}>
      {isLiked ? (
        <ThumbsUpIcon width={iconSize} height={iconSize} color={color} />
      ) : (
        <ThumbsUpStrokeRoundedIcon width={iconSize} height={iconSize} color={color} />
      )}
      <SemiBold style={{ fontSize: 10, color }}>{nFormatter(likeCount)}</SemiBold>
    </Press>
  )
}

type UnfoldIconProps = {
  colorScheme: ColorScheme
}
export function UnfoldIcon({ colorScheme }: UnfoldIconProps) {
  const color = colorScheme === 'dark' ? colors.zinc[200] : colors.zinc[800]
  return (
    <>
      <Press className='p-2 pb-3' style={{ gap: 5 }} activeScale={0.9}>
        <UnfoldLessStrokeRoundedIcon color={color} height={iconSize} width={iconSize} />
      </Press>
    </>
  )
}
