import { Medium } from '@utils/fonts'
import React from 'react'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'

type QuestionProps = {
  qnNo: number
  isActive: boolean
  isBookmarked: boolean
}

function getColor(isActive: boolean, isBookMarked: boolean, isAnswered: boolean) {
  if (isBookMarked) return 'bg-red-500'
  if (isAnswered) return 'bg-green-500'
  if (isActive) return 'bg-blue-500'
  return 'bg-zinc-500' // Not Attempted
}

const Question = React.memo<QuestionProps & TouchableOpacityProps>(({ qnNo, isActive, isBookmarked, ...rest }) => {
  return (
    <TouchableOpacity
      className={`h-11 w-9 items-center justify-center rounded-md rounded-tl-2xl ${getColor(isActive, isBookmarked, false)}`}
      activeOpacity={0.7}
      {...rest}
    >
      <Medium className='text-sm text-white'>{qnNo + 1}</Medium>
    </TouchableOpacity>
  )
})

export default Question
