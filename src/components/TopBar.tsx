import { SemiBold } from '@utils/fonts'
import { View } from 'react-native'

export default function TopBar() {
  return (
    <View className='px-5 pt-5'>
      <View className='mx-auto h-1.5 w-28 justify-between rounded-full bg-zinc-200 dark:bg-zinc-800' />
    </View>
  )
}
