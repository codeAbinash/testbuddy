import { ColoredSmallBtn, SmallBtn } from '@components/Button'
import { PaddingBottom } from '@components/SafePadding'
import api from '@query/api'
import { useMutation } from '@tanstack/react-query'
import { ColorScheme } from '@utils/types'
import { print, timeDiffFromNow } from '@utils/utils'
import React, { useCallback } from 'react'
import { View } from 'react-native'
import colors from 'tailwindcss/colors'
import currentQnStore from '../zustand/currentQn'
import testStore from '../zustand/testStore'
import timeStore from '../zustand/timeStore'
import { SectionDetails } from './SectionDetails'

type FooterProps = {
  colorScheme: ColorScheme
  handleNext: () => void
  handlePrev: () => void
  testId: string
}

export const Footer = React.memo<FooterProps>(({ colorScheme, handleNext, handlePrev, testId }) => {
  const allQn = testStore((store) => store.allQn)
  const setAllQn = testStore((store) => store.setAllQn)
  const qnNo = currentQnStore((store) => store.qnNo)
  const isBookmarked = allQn?.[qnNo]?.isBookMarked
  const testSeriesId = testStore((store) => store.testData?.testSeriesId)
  const lastApiCallTime = timeStore((store) => store.lastApiCallTime)

  const { mutate, isPending } = useMutation({
    mutationKey: ['updateTest', testSeriesId, qnNo],
    mutationFn: api.updateTest,
    onSuccess: print,
  })

  const toggleBookmark = useCallback(() => {
    if (!allQn[qnNo]) return
    allQn[qnNo].isBookMarked = !allQn[qnNo].isBookMarked
    setAllQn([...allQn])

    mutate({
      resData: [
        {
          question: allQn[qnNo].questionId!,  
          action: 'time-update',
          time: timeDiffFromNow(lastApiCallTime),
          marked: true,
          isBookMarked: allQn[qnNo].isBookMarked!,
          nextQuestion: allQn[qnNo + 1]?.questionId!,
        },
      ],
      testSeriesId: testSeriesId!,
    })
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
