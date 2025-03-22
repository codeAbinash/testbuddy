import { Medium } from '@utils/fonts'
import { ColorScheme, type mode } from '@utils/types'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import MathJax from '../Math/MathJax'

type MCQSelectorProps = {
  content?: string
  i: number
  selected: number
  onSelect: (i: number) => void
  colorScheme: ColorScheme
  mode: mode
  isCorrect?: boolean
  correctOptions?: string[]
}

const MCQSelector = React.memo(
  ({ content, i, selected, onSelect, colorScheme, mode, isCorrect, correctOptions }: MCQSelectorProps) => {
    const bgColor = getBgColor(selected, i, mode, isCorrect, correctOptions)
    const textColor = getTextColor(selected, i, mode, correctOptions)

    return (
      <TouchableOpacity
        key={i}
        className='flex-row items-center gap-5'
        activeOpacity={0.6}
        onPress={() => onSelect(i)}
        disabled={mode === 'solution'}
      >
        <View className={`size-8 items-center justify-center rounded-full ${bgColor}`}>
          <Medium className={`mt-0.5 text-center text-sm ${textColor} `}>{String.fromCharCode(65 + i)}</Medium>
        </View>
        <View className='flex-1'>
          <MathJax key={i} colorScheme={colorScheme} html={content} />
        </View>
      </TouchableOpacity>
    )
  },
)

const bgColor = 'border border-zinc-300 dark:border-zinc-700'
function getBgColor(selected: number, i: number, mode: mode, isCorrect?: boolean, correctOptions?: string[]) {
  const currChar = String.fromCharCode(65 + i)
  const isSelected = selected === i
  const isValidSelection = correctOptions?.includes(currChar)
  if (mode === 'test') return isSelected ? 'bg-accent dark:bg-white' : bgColor
  if (isSelected) return isCorrect ? 'bg-green-500' : 'bg-red-500'
  if (isValidSelection) return 'bg-blue-500'
  return bgColor
}

function getTextColor(selected: number, i: number, mode: mode, correctOptions?: string[]) {
  const currChar = String.fromCharCode(65 + i)
  const isSelected = selected === i
  const isValidSelection = correctOptions?.includes(currChar)
  if (mode === 'test') return isSelected ? 'text-white dark:text-accent' : 'text'
  if (isSelected || isValidSelection) return 'text-white'
  return 'text'
}

export default MCQSelector
