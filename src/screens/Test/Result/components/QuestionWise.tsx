import ColorIndicator from '@components/ColorIndicator'
import { Medium } from '@utils/fonts'
import { secToHrMinSec } from '@utils/utils'
import React from 'react'
import { View } from 'react-native'
import colors from 'tailwindcss/colors'
import { QuestionWiseAnalysis } from '../types/result'
function randomTime() {
  return Math.random() * 100
}

export const topperColor = colors.violet['500'] + '33'
export const otherColor = colors.violet['500'] + '99'
export const meColor = colors.violet['500']

function QuestionWiseColors() {
  return (
    <View className='mt-3 flex-row flex-wrap items-center justify-center gap-2 gap-x-5' style={{ paddingBottom: 25 }}>
      <ColorIndicator text='Time Spend By Me' color={meColor} />
      <ColorIndicator text='Time Spend By Others' color={otherColor} />
      <ColorIndicator text='Time Spend By Topper' color={topperColor} />
    </View>
  )
}

const QuestionWise = React.memo<{ q?: QuestionWiseAnalysis[] }>(({ q }) => {
  return (
    <View>
      <QuestionWiseColors />
      <View className='gap-3'>{q?.map((q, i) => <Question q={q} key={q.questionId} i={i + 1} />)}</View>
    </View>
  )
})

export default QuestionWise

function Question({ q, i }: { q: QuestionWiseAnalysis; i: number }) {
  const me = q.timeSpentByMe || 0
  const others = __DEV__ ? randomTime() : q.timeSpentByThoseWhoGotRight || 0
  const topper = __DEV__ ? randomTime() : q.timeSpentByTopper || 0
  const total = me + others + topper
  return (
    <View key={q.questionId} className='gap-1'>
      <View className='flex-row'>
        <Medium className='text w-1/3 text-xs capitalize opacity-80'>
          Q.{i} Me: {secToHrMinSec(me)}
        </Medium>
        <Medium className='text w-1/3 text-center text-xs capitalize opacity-80'>
          Others: {secToHrMinSec(others)}
        </Medium>
        <Medium className='text w-1/3 text-right text-xs capitalize opacity-80'>Topper: {secToHrMinSec(topper)}</Medium>
      </View>
      <View>
        <View className='h-5 w-full flex-row overflow-hidden rounded-md bg-zinc-100 dark:bg-zinc-900'>
          <View
            className='h-full bg-violet-500'
            style={{ width: `${(me / total) * 100}%`, backgroundColor: meColor }}
          ></View>
          <View
            className='h-full bg-violet-500/70'
            style={{ width: `${(others / total) * 100}%`, backgroundColor: otherColor }}
          ></View>
          <View
            className='h-full bg-violet-500/50'
            style={{ width: `${(topper / total) * 100}%`, backgroundColor: topperColor }}
          ></View>
        </View>
      </View>
    </View>
  )
}
