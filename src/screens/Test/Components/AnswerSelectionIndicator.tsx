import ColorIndicator from '@components/ColorIndicator'
import { View } from 'react-native'
import colors from 'tailwindcss/colors'

export default function AnswerSelectionIndicator() {
  return (
    <View className='mt-3 gap-2'>
      <ColorIndicator text='Correct and selected' color={colors.green[500]} />
      <ColorIndicator color={colors.blue[500]} text='Correct and not selected' />
      <ColorIndicator color={colors.red[500]} text='Incorrect and selected' />
    </View>
  )
}
