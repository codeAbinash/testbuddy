import { Medium } from '@utils/fonts'
import { ColorScheme, type mode } from '@utils/types'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import MathJax from '../Math/MathJax'

type SelectorProps = {
  i: number
  onSelect: (i: number) => void
  mode: mode
  selected: string[]
  qn: any
  colorScheme: ColorScheme
  op: any
}
const MultiOptionSelector = React.memo<SelectorProps>(({ i, colorScheme, selected, mode, qn, onSelect, op }) => {
  const bgColor = getBgColor(selected, i, mode, qn?.correct_options)
  const textColor = getTextColor(selected, i, mode, qn?.correct_options)

  return (
    <TouchableOpacity
      className='flex-row items-center gap-5'
      activeOpacity={0.6}
      onPress={() => onSelect(i)}
      disabled={mode === 'solution'}
    >
      <View className={`size-8 items-center justify-center rounded-full ${bgColor}`}>
        <Medium className={`mt-0.5 text-center text-sm ${textColor}`}>{String.fromCharCode(65 + i)}</Medium>
      </View>
      <View className='flex-1'>
        <MathJax key={i} colorScheme={colorScheme} html={op.content} />
      </View>
    </TouchableOpacity>
  )
})
export default MultiOptionSelector

const bgColor = 'border border-zinc-300 dark:border-zinc-700'
function getBgColor(selected: string[], i: number, mode: mode, correct_options?: string[]) {
  const currChar = String.fromCharCode(65 + i)
  const isSelected = selected.includes(currChar)
  const isValidSelection = correct_options?.includes(currChar)
  if (mode === 'test') return isSelected ? 'bg-accent dark:bg-white' : bgColor
  if (isSelected) return isValidSelection ? 'bg-green-500' : 'bg-red-500'
  if (isValidSelection) return 'bg-blue-500'
  return bgColor
}

function getTextColor(selected: string[], i: number, mode: mode, correct_options?: string[]) {
  const currChar = String.fromCharCode(65 + i)
  const isSelected = selected.includes(currChar)
  const isValidSelection = correct_options?.includes(currChar)
  if (mode === 'test') return isSelected ? 'text-white dark:text-accent' : 'text'
  if (isSelected || isValidSelection) return 'text-white'
  return 'text'
}
