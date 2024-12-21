import { Clock01Icon } from '@assets/icons/icons'
import { Medium } from '@utils/fonts'
import { View } from 'react-native'
import colors from 'tailwindcss/colors'

export function QuestionHeading({ qnNo, allQn }: { qnNo: number; allQn: any }) {
  return (
    <View className='flex-row justify-between px-6'>
      <Medium className='text text-sm'>
        Question: {qnNo + 1}
        {'  '}|{'  '}Marks: <Medium className='text-green-500'>+{allQn[qnNo]?.marks}</Medium>{' '}
        <Medium className='text-red-500'>-{allQn[qnNo]?.negMarks}</Medium>
      </Medium>

      <View className='flex-row items-center justify-center gap-1.5'>
        <Clock01Icon width={14} height={14} color={colors.zinc[500]} />
        <Medium className='text mb-0.5 text-sm'>05:01:05</Medium>
      </View>
    </View>
  )
}
