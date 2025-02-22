import { View } from 'react-native'

/**
 * @deprecated This component is deprecated and will be removed in future releases.
 */
export default function TopBar() {
  return (
    <View className='px-5 pt-5'>
      <Bar />
    </View>
  )
}

export const Bar = () => (
  <View className='mx-auto h-1.5 w-28 justify-between rounded-full bg-zinc-200 dark:bg-zinc-800' />
)

export const AppBar = () => (
  <View className='pt-4 pb-3.5'>
    <Bar />
  </View>
)
