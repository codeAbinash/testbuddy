import { Medium } from '@utils/fonts'
import { ColorScheme, mode } from '@utils/types'
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
}

const MCQSelector = React.memo(({ content, i, selected, onSelect, colorScheme, mode }: MCQSelectorProps) => (
  <TouchableOpacity
    key={i}
    className='flex-row items-center gap-5'
    activeOpacity={0.6}
    onPress={() => onSelect(i)}
    disabled={mode === 'solution'}
  >
    <View
      className={`size-8 items-center justify-center rounded-full ${selected === i ? 'bg-accent dark:bg-white' : 'border border-zinc-300 dark:border-zinc-700'}`}
    >
      <Medium className={`mt-0.5 text-center text-sm ${selected === i ? 'text-white dark:text-accent' : 'text'} `}>
        {String.fromCharCode(65 + i)}
      </Medium>
    </View>
    <View className='flex-1'>
      <MathJax key={i} colorScheme={colorScheme} html={content} />
    </View>
  </TouchableOpacity>
))

export default MCQSelector
