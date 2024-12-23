import { Medium } from '@utils/fonts'
import React from 'react'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'

type QuestionProps = {
  qnNo: number
  isActive: boolean
}
const Question = React.memo<QuestionProps & TouchableOpacityProps>(({ qnNo, isActive, ...rest }) => {
  return (
    <TouchableOpacity
      className={`h-11 w-9 items-center justify-center rounded-md rounded-tl-2xl ${isActive ? 'bg-blue-500' : 'bg-zinc-500'}`}
      activeOpacity={0.7}
      {...rest}
    >
      <Medium className='text-sm text-white'>{qnNo + 1}</Medium>
    </TouchableOpacity>
  )
})

export default Question
