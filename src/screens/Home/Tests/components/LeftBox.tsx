import { SemiBold } from '@utils/fonts'
import { View } from 'react-native'
import type { Test } from '../TestList'

export function LeftBox({ test, index }: { test: Test; index: number }) {
  return (
    <View
      className='flex-0 h-12 min-w-12 items-center justify-center border border-black/10 bg-black/5 p-2 dark:border-white/20 dark:bg-white/10'
      style={{
        // backgroundColor: allColors[index % allColors.length] + '33',
        // borderColor: allColors[index % allColors.length] + '66',
        borderRadius: 9,
      }}
    >
      <SemiBold
        className='text text-xs opacity-80'
        // style={{ color: allColors[index % allColors.length] }}
      >
        {test.testAbr}
      </SemiBold>
    </View>
  )
}
