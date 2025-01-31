import { Clock01Icon } from '@assets/icons/icons'
import { Medium, SemiBold } from '@utils/fonts'
import { ColorScheme, type mode } from '@utils/types'
import { secToHrMinSec } from '@utils/utils'
import React, { useEffect } from 'react'
import { View } from 'react-native'
import colors from 'tailwindcss/colors'
import testStore from '../zustand/testStore'

type SectionDetailsProps = {
  qnNo: number
  allQn: any
  colorScheme: ColorScheme
  mode: mode
}

export const SectionDetails = React.memo<SectionDetailsProps>(({ qnNo, allQn, colorScheme, mode }) => {
  const testData = testStore((store) => store.testData)
  const setTestData = testStore((store) => store.setTestData)
  useEffect(() => {
    if (mode === 'solution') return
    const timer = setTimeout(() => {
      setTestData({ ...testData, totalTimeCompleted: (testData?.totalTimeCompleted || 0) + 1 })
    }, 1000)
    return () => clearTimeout(timer)
  }, [mode, setTestData, testData])

  return (
    <View className='flex-row items-center justify-between bg-white px-5 pt-2 dark:bg-zinc-950'>
      <Medium className='text text-sm capitalize opacity-80' style={{ fontSize: 12 }}>
        Section {allQn[qnNo]?.section}: {allQn[qnNo]?.subject} | Attempted 5/90
      </Medium>
      <View className='flex-row items-center gap-1 opacity-80'>
        <Clock01Icon width={13} height={13} color={colorScheme === 'dark' ? colors.zinc[200] : colors.zinc[800]} />
        <SemiBold className='text mt-0.5 gap-5 text-sm' style={{ fontSize: 12, fontVariant: ['tabular-nums'] }}>
          {secToHrMinSec(testData?.totalTimeCompleted || 0)}
        </SemiBold>
      </View>
    </View>
  )
})
