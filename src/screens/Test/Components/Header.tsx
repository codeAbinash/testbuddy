import popupStore from '@/zustand/popupStore'
import { ArrowLeft01StrokeRoundedIcon } from '@assets/icons/icons'
import { SmallBtn } from '@components/Button'
import { PaddingTop } from '@components/SafePadding'
import api from '@query/api'
import { useMutation } from '@tanstack/react-query'
import { SemiBold } from '@utils/fonts'
import { ColorScheme, StackNav } from '@utils/types'
import { print, timeDiffFromNow } from '@utils/utils'
import React from 'react'
import { ToastAndroid, TouchableOpacity, View } from 'react-native'
import colors from 'tailwindcss/colors'
import currentQnStore from '../zustand/currentQn'
import modalStore from '../zustand/modalStore'
import testStore from '../zustand/testStore'
import timeStore from '../zustand/timeStore'
import { MoreOption } from './MoreOption'

type HeaderProps = {
  navigation: StackNav
  colorScheme: ColorScheme
}

export const Header = React.memo<HeaderProps>(({ navigation, colorScheme }) => {
  const data = testStore((store) => store.testData)
  const setOpen = modalStore((store) => store.setOpen)

  const open = modalStore((store) => store.open)
  const viewMode = modalStore((store) => store.viewMode)
  const testSeriesId = testStore((store) => store.testData?.testSeriesId)
  const allQn = testStore((store) => store.allQn)
  const qnNo = currentQnStore((store) => store.qnNo)
  const lastApiCallTime = timeStore((store) => store.lastApiCallTime)
  const alert = popupStore((store) => store.alert)

  const { mutate, isPending } = useMutation({
    mutationKey: ['updateTest', testSeriesId, qnNo],
    mutationFn: api.updateTest,
    onSuccess: print,
  })

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
    navigation.goBack()
  }

  function handleSubmit() {
    alert('Submit test?', 'Are you sure you want to submit the test?', [
      { text: 'No' },
      { text: 'Yes', onPress: mutateTest },
    ])
  }

  return (
    <View className='bg-white dark:bg-zinc-950'>
      <PaddingTop />
      <View className='flex-row items-center' style={{ gap: 10 }}>
        <TouchableOpacity className='pb-2.5 pl-2.5 pr-0 pt-2' onPress={() => navigation.goBack()} activeOpacity={0.7}>
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
            <View className='justify-center'>
              <SmallBtn
                title='Submit'
                style={{ paddingHorizontal: 17, paddingVertical: 5, borderRadius: 9 }}
                onPress={handleSubmit}
              />
            </View>
          </View>
        </View>
        <MoreOption colorScheme={colorScheme} onPress={() => setOpen(true)} />
      </View>
    </View>
  )
})
