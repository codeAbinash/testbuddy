import { Clock01Icon } from '@assets/icons/icons'
import { Medium, SemiBold } from '@utils/fonts'
import { ColorScheme } from '@utils/types'
import { secToHrMinSec } from '@utils/utils'
import React from 'react'
import { View } from 'react-native'
import colors from 'tailwindcss/colors'
import { Question } from '../zustand/testStore'

type QuestionHeadingProps = {
  qnNo: number
  allQn: Question[]
  colorScheme: ColorScheme
}

export const QuestionHeading = React.memo<QuestionHeadingProps>(({ qnNo, allQn, colorScheme }) => {
  return (
    <View className='flex-row justify-between px-5'>
      <Medium className='text text-sm'>
        Question: {qnNo + 1}
        {'  '}|{'  '}Marks: <Medium className='text-green-600 dark:text-green-500'>+{allQn[qnNo]?.marks}</Medium>{' '}
        <Medium className='text-rose-500'>-{allQn[qnNo]?.negMarks}</Medium>
      </Medium>
      <View className='flex-row items-center gap-1 opacity-80'>
        <Clock01Icon width={13} height={13} color={colorScheme === 'dark' ? colors.zinc[200] : colors.zinc[800]} />
        <SemiBold className='text mt-0.5 gap-5 text-sm' style={{ fontSize: 12, fontVariant: ['tabular-nums'] }}>
          {secToHrMinSec(allQn[qnNo]?.totalTimeSpent || 0)}
        </SemiBold>
      </View>
    </View>
  )
})
