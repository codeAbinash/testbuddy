import { ColoredSmallBtn, SmallBtn } from '@components/Button'
import { PaddingBottom } from '@components/SafePadding'
import { ColorScheme, type mode } from '@utils/types'
import { timeDiffFromNow } from '@utils/utils'
import React, { useCallback } from 'react'
import { View } from 'react-native'
import colors from 'tailwindcss/colors'
import useUpdateTestMutation from '../hooks/useUpdateTestMutation'
import currentQnStore from '../zustand/currentQn'
import testStore from '../zustand/testStore'
import timeStore from '../zustand/timeStore'
import { SectionDetails } from './SectionDetails'

type FooterProps = {
  colorScheme: ColorScheme
  mode: mode
}

export const Footer = React.memo<FooterProps>(({ colorScheme, mode }) => {
  const allQn = testStore((store) => store.allQn)
  const setAllQn = testStore((store) => store.setAllQn)
  const qnNo = currentQnStore((store) => store.qnNo)
  const isBookmarked = allQn?.[qnNo]?.isBookMarked
  const testSeriesId = testStore((store) => store.testData?.testSeriesId)
  const lastApiCallTime = timeStore((store) => store.lastApiCallTime)
  const setQnNo = currentQnStore((store) => store.setQnNo)

  const { mutate } = useUpdateTestMutation(testSeriesId!)

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allQn, qnNo, setAllQn])

  function handleNext() {
    setQnNo((qnNo + 1) % allQn.length)
  }

  function handlePrev() {
    setQnNo((qnNo - 1 + allQn.length) % allQn.length)
  }

  return (
    <View
      className='border-zinc-100 bg-white dark:border-zinc-800 dark:bg-zinc-950'
      style={{ borderWidth: 0, borderTopWidth: 1 }}
    >
      <SectionDetails qnNo={qnNo} allQn={allQn} colorScheme={colorScheme} mode={mode} />
      <View className='flex-row gap-2.5 px-4 pb-1 pt-2.5'>
        <SmallBtn variant='secondary' style={{ flex: 0.7 }} title='Previous' onPress={handlePrev} />
        {mode === 'test' ? (
          <>
            {isBookmarked ? (
              <ColoredSmallBtn
                title='Bookmarked'
                color={colors.red[500]}
                style={{ flex: 1 }}
                onPress={toggleBookmark}
              />
            ) : (
              <SmallBtn title='Bookmark' variant='secondary' style={{ flex: 1 }} onPress={toggleBookmark} />
            )}
          </>
        ) : null}
        <SmallBtn style={{ flex: 0.7 }} title='Next' onPress={handleNext} />
      </View>
      <PaddingBottom />
    </View>
  )
})
