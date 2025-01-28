import { W } from '@utils/dimensions'
import { Medium, SemiBold } from '@utils/fonts'
import { View } from 'react-native'
import { Result } from './types/result'

type ColorBoxProps = {
  value: number | string
  label: string
  bgColor: string
  textColor: string
  animDelay?: number
}

const ColorBox = ({ value, label, bgColor, textColor }: ColorBoxProps) => {
  return (
    <View className='flex-1'>
      <View className={`aspect-square w-full items-center justify-center rounded-full ${bgColor}`}>
        <SemiBold className={`mb-1 ${textColor}`}>{value}</SemiBold>
      </View>
      <Medium className='text mt-2 text-center text-xs opacity-80'>{label}</Medium>
    </View>
  )
}

export default ColorBox

export function ColorBoxes({ result }: { result?: Result }) {
  return (
    <View>
      <View style={{ width: W - 40 }} className='mx-auto mt-8 flex-row justify-between gap-4'>
        <ColorBox
          value={result?.totalPositiveMarks || 0}
          label='Positive Marks'
          bgColor='bg-green-500/20'
          textColor='text-green-500'
          animDelay={100}
        />
        <ColorBox
          value={result?.totalNegativeMarks || 0}
          label='Negative Marks'
          bgColor='bg-red-500/20'
          textColor='text-red-500'
          animDelay={200}
        />
        <ColorBox
          value={result?.attemptedQuestions || 0}
          label='Attempted Questions'
          bgColor='bg-blue-500/20'
          textColor='text-blue-500'
          animDelay={300}
        />
        <ColorBox
          value={result?.correctAnswers || 0}
          label='Correct Answers'
          bgColor='bg-green-500/20'
          textColor='text-green-500'
          animDelay={400}
        />
        <ColorBox
          value={result?.percentageCorrect?.toFixed(2) || 0}
          label='Percentage Correct'
          bgColor='bg-yellow-500/20'
          textColor='text-yellow-500'
          animDelay={500}
        />
      </View>
    </View>
  )
}
