import { SemiBold } from '@utils/fonts'
import { View } from 'react-native'

export default function ColorIndicator({ text, color }: { text: string; color: string }) {
  return (
    <View className='flex-row items-center gap-3'>
      <View className={'size-3.5'} style={{ borderRadius: 3.5, backgroundColor: color }} />
      <SemiBold className='text text-xs opacity-80'>{text}</SemiBold>
    </View>
  )
}
