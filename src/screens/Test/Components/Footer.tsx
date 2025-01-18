import { ColoredSmallBtn, SmallBtn } from '@components/Button'
import { PaddingBottom } from '@components/SafePadding'
import { ColorScheme } from '@utils/types'
import React, { useCallback } from 'react'
import { StyleSheet, View } from 'react-native'
import colors from 'tailwindcss/colors'
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
  const setAllQn = testStore((store) => store.setAllQn)
  const qnNo = currentQnStore((store) => store.qnNo)
  const isBookmarked = allQn?.[qnNo]?.isBookMarked

  const toggleBookmark = useCallback(() => {
    const question = allQn?.[qnNo]
    if (!question) return
    question.isBookMarked = !question.isBookMarked
    setAllQn([...allQn])
  }, [allQn, qnNo, setAllQn])

  return (
    <View
      className='border-zinc-100 bg-white dark:border-zinc-800 dark:bg-zinc-950'
      style={{ borderWidth: 0, borderTopWidth: 1 }}
    >
      <SectionDetails qnNo={qnNo} allQn={allQn} colorScheme={colorScheme} />
      <View className='flex-row gap-2.5 px-4 pb-1 pt-2.5'>
        <SmallBtn variant='secondary' style={{ flex: 0.7 }} title='Previous' onPress={handlePrev} />
        {isBookmarked ? (
          <ColoredSmallBtn title='Bookmarked' color={colors.red[500]} style={{ flex: 1 }} onPress={toggleBookmark} />
        ) : (
          <SmallBtn title='Bookmark' variant='secondary' style={{ flex: 1 }} onPress={toggleBookmark} />
        )}
        <SmallBtn style={{ flex: 0.7 }} title='Next' onPress={handleNext} />
      </View>
      <PaddingBottom />
    </View>
  )
})

const styles = StyleSheet.create({
  red: {
    backgroundColor: colors.red[500],
    flex: 1,
  },
  normal: {
    flex: 1,
  },
})
