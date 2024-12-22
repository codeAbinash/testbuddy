import { SmallBtn } from '@components/Button'
import { PaddingBottom } from '@components/SafePadding'
import { ColorScheme } from '@utils/types'
import React from 'react'
import { View } from 'react-native'
import currentQnStore from '../zustand/currentQn'
import testStore from '../zustand/testStore'
import { SectionDetails } from './SectionDetails'

type FooterProps = {
  colorScheme: ColorScheme
  handleNext: () => void
  handlePrev: () => void
}

export const Footer = React.memo<FooterProps>(({ colorScheme, handleNext, handlePrev }) => {
  const allQn = testStore((store) => store.allQn)
  const qnNo = currentQnStore((store) => store.qnNo)
  return (
    <View
      className='border-gray-100 bg-white dark:border-zinc-800 dark:bg-zinc-950'
      style={{ borderWidth: 0, borderTopWidth: 1 }}
    >
      <SectionDetails qnNo={qnNo} allQn={allQn} colorScheme={colorScheme} />
      <View className='flex-row gap-2.5 px-4 pb-1 pt-2.5'>
        <SmallBtn variant='secondary' style={{ flex: 0.7 }} title='Previous' onPress={handlePrev} />
        <SmallBtn variant='secondary' style={{ flex: 1 }} title='Remove from review' />
        <SmallBtn style={{ flex: 0.7 }} title='Next' onPress={handleNext} />
      </View>
      <PaddingBottom />
    </View>
  )
})
