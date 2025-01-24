import { Clock01Icon } from '@assets/icons/icons'
import { Medium, SemiBold } from '@utils/fonts'
import { ColorScheme } from '@utils/types'
import { secToHrMinSec } from '@utils/utils'
import React, { useEffect } from 'react'
import { View } from 'react-native'
import colors from 'tailwindcss/colors'
import testStore from '../zustand/testStore'

export const SectionDetails = React.memo<{ qnNo: number; allQn: any; colorScheme: ColorScheme }>(
  ({ qnNo, allQn, colorScheme }) => {
    const testData = testStore((store) => store.testData)
    const setTestData = testStore((store) => store.setTestData)
    useEffect(() => {
      // Update the total time spent on the test
      const timer = setTimeout(() => {
        setTestData({ ...testData, totalTimeCompleted: (testData?.totalTimeCompleted || 0) + 1 })
      }, 1000)
      return () => clearInterval(timer)
    }, [testData])

    return (
      <View className='flex-row items-center justify-between bg-white px-5 pt-1 dark:bg-zinc-950'>
        <Medium className='text text-sm capitalize opacity-80' style={{ fontSize: 12 }}>
          Section {allQn[qnNo]?.section}: {allQn[qnNo]?.subject} | Attempted 5/90
        </Medium>
        <View className='flex-row items-center gap-1 opacity-80'>
          <Clock01Icon width={13} height={13} color={colorScheme === 'dark' ? colors.zinc[200] : colors.zinc[800]} />
          <SemiBold className='text mb-1 gap-5 text-sm' style={{ fontSize: 12, fontVariant: ['tabular-nums'] }}>
            {secToHrMinSec(testData?.totalTimeCompleted || 0)}
          </SemiBold>
        </View>
      </View>
    )
  },
)
