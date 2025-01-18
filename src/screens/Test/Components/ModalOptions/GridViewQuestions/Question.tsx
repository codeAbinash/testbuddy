import { Medium } from '@utils/fonts'
import React from 'react'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'

type QuestionProps = {
  qnNo: number
  isActive: boolean
  isBookmarked: boolean
  visited: boolean
  isAnswered: boolean
}

function getColor(isActive: boolean, isAnswered: boolean, isVisited: boolean) {
  if (isActive) return 'bg-blue-500'
  if (isAnswered) return 'bg-green-500'
  if (isVisited && !isAnswered) return 'bg-orange-500' // Not Answered
  return 'bg-zinc-500' // Not Attempted
}

const Question = React.memo<QuestionProps & TouchableOpacityProps>(
  ({ qnNo, isActive, isBookmarked, visited, isAnswered, ...rest }) => {
    return (
      <TouchableOpacity
        className={`h-11 w-9 items-center justify-center rounded-md rounded-tl-2xl ${getColor(isActive, isAnswered, visited)}`}
        activeOpacity={0.7}
        {...rest}
      >
        <Medium className='text-sm text-white'>{qnNo + 1}</Medium>
        {isBookmarked && <Medium className='absolute -right-2 -top-2 text-xl text-white'>🔖</Medium>}
      </TouchableOpacity>
    )
  },
)

export default Question
