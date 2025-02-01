import popupStore from '@/zustand/popupStore'
import { ArrowLeft01StrokeRoundedIcon } from '@assets/icons/icons'
import { SmallBtn } from '@components/Button'
import { PaddingTop } from '@components/SafePadding'
import { queryClient } from '@query/query'
import { SemiBold } from '@utils/fonts'
import { ColorScheme, type mode, StackNav } from '@utils/types'
import { timeDiffFromNow } from '@utils/utils'
import React, { useEffect } from 'react'
import { BackHandler, ToastAndroid, TouchableOpacity, View } from 'react-native'
import colors from 'tailwindcss/colors'
import useUpdateTestMutation from '../hooks/useUpdateTestMutation'
import { handleSubmit } from '../utils/utils'
import currentQnStore from '../zustand/currentQn'
import modalStore from '../zustand/modalStore'
import testStore from '../zustand/testStore'
import timeStore from '../zustand/timeStore'
import { MoreOption } from './MoreOption'

type HeaderProps = {
  navigation: StackNav
  colorScheme: ColorScheme
  testId: string
  mode: mode
}

export const Header = React.memo<HeaderProps>(({ navigation, colorScheme, testId, mode }) => {
  const data = testStore((store) => store.testData)
  const setOpen = modalStore((store) => store.setOpen)

  const testSeriesId = testStore((store) => store.testData?.testSeriesId)
  const allQn = testStore((store) => store.allQn)
  const qnNo = currentQnStore((store) => store.qnNo)
  const lastApiCallTime = timeStore((store) => store.lastApiCallTime)
  const alert = popupStore((store) => store.alert)
  const clearTestData = testStore((store) => store.clearTestData)
  const setQnNo = currentQnStore((store) => store.setQnNo)
  const removePopup = popupStore((store) => store.removePopup)
  const popupsLen = popupStore((store) => store.popups.length)

  const { mutate } = useUpdateTestMutation(testSeriesId!, () => {
    navigation.replace('Solution', { testId })
    removePopup(popupsLen - 1)
    setQnNo(0)
    clearTestData()
    queryClient.invalidateQueries({ queryKey: ['test', testId] })
  })

  const onBackPress = React.useCallback(() => {
    if (mode === 'solution') {
      queryClient.invalidateQueries({ queryKey: ['test', testId] })
      navigation.goBack()
      return true
    }
    alert('Exit test?', 'Do you want to exit the test?', [
      { text: 'Cancel' },
      {
        text: 'Exit',
        onPress: () => {
          navigation.goBack()
          clearTestData()
          setQnNo(0)
          queryClient.invalidateQueries({ queryKey: ['test', testId] })
        },
      },
    ])
    return true
  }, [mode, alert, navigation, clearTestData, setQnNo, testId])

  function mutateTest() {
    const qn = allQn?.[qnNo]
    mutate({
      resData: [
        {
          question: qn!.questionId!,
          action: 'submit-test',
          time: timeDiffFromNow(lastApiCallTime),
          marked: true,
          markedAnswer: qn!.markedAnswer,
          nextQuestion: allQn[qnNo + 1]?.questionId!,
        },
      ],
      testSeriesId: testSeriesId!,
    })
    setOpen(false)
    ToastAndroid.show('Test submitted successfully', ToastAndroid.SHORT)
  }

  // Handle back press
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPress)
    return () => backHandler.remove()
  }, [alert, navigation, clearTestData, setQnNo, mode, onBackPress])

  return (
    <View className='bg-white dark:bg-zinc-950'>
      <PaddingTop />
      <View className='flex-row items-center' style={{ gap: 10 }}>
        <TouchableOpacity className='pb-2.5 pl-2.5 pr-0 pt-2' onPress={onBackPress} activeOpacity={0.7}>
          <ArrowLeft01StrokeRoundedIcon
            width={26}
            height={26}
            color={colorScheme === 'dark' ? colors.zinc[200] : colors.zinc[800]}
          />
        </TouchableOpacity>
        <View className='flex-1 flex-col'>
          <View className='flex-row justify-between gap-1'>
            <SemiBold
              style={{ fontSize: 11, flex: 1, lineHeight: 16 }}
              className='-mt-0.5 text-zinc-800 dark:text-zinc-200'
              numberOfLines={2}
            >
              {data?.test?.testTitle || 'Loading...'}{' '}
              <SemiBold className='capitalize text-zinc-500 dark:text-zinc-400'>({data?.test?.language})</SemiBold>
            </SemiBold>
            {mode === 'test' && (
              <View className='justify-center'>
                <SmallBtn
                  title='Submit'
                  style={{ paddingHorizontal: 17, paddingVertical: 5, borderRadius: 9 }}
                  onPress={() => handleSubmit(alert, mutateTest)}
                />
              </View>
            )}
          </View>
        </View>
        <MoreOption colorScheme={colorScheme} onPress={() => setOpen(true)} />
      </View>
    </View>
  )
})
