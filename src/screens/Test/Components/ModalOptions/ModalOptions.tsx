import popupStore from '@/zustand/popupStore'
import { SmallBtn } from '@components/Button'
import { PaddingBottom, PaddingTop } from '@components/SafePadding'
import { useNavigation } from '@react-navigation/native'
import useUpdateTestMutation from '@screens/Test/hooks/useUpdateTestMutation'
import currentQnStore from '@screens/Test/zustand/currentQn'
import testStore from '@screens/Test/zustand/testStore'
import timeStore from '@screens/Test/zustand/timeStore'
import { H, W } from '@utils/dimensions'
import { Medium } from '@utils/fonts'
import { ColorScheme, StackNav } from '@utils/types'
import { timeDiffFromNow } from '@utils/utils'
import React from 'react'
import { Modal, ScrollView, ToastAndroid, TouchableOpacity, View } from 'react-native'
import modalStore, { ViewMode } from '../../zustand/modalStore'
import GridList from './GridList'
import GridViewQuestions from './GridViewQuestions/GridViewQuestions'
import Question from './GridViewQuestions/Question'
import QuestionInformation from './QuestionInformation'
import ViewInstructions from './ViewInstructions'

export type ModalOptionsProps = {
  colorScheme: ColorScheme
}

export const ModalOptions = React.memo<ModalOptionsProps>(({ colorScheme }) => {
  const setOpen = modalStore((store) => store.setOpen)
  const open = modalStore((store) => store.open)
  const viewMode = modalStore((store) => store.viewMode)
  const testSeriesId = testStore((store) => store.testData?.testSeriesId)
  const allQn = testStore((store) => store.allQn)
  const qnNo = currentQnStore((store) => store.qnNo)
  const lastApiCallTime = timeStore((store) => store.lastApiCallTime)
  const alert = popupStore((store) => store.alert)
  const navigation = useNavigation<StackNav>()

  const { mutate } = useUpdateTestMutation(testSeriesId!)

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

  // const selected
  return (
    <View>
      <Modal
        animationType='fade'
        transparent={true}
        visible={open}
        hardwareAccelerated
        statusBarTranslucent
        onRequestClose={() => setOpen(false)}
      >
        <TouchableOpacity
          onPress={() => setOpen(false)}
          activeOpacity={1}
          className='flex-1 items-end justify-start bg-black/20 dark:bg-black/40'
        >
          <View className='rounded-2xl bg-white px-2 pb-0 dark:bg-zinc-900'>
            <ScrollView
              className='w-[79%] flex-grow-0 rounded-xl'
              style={[{ maxHeight: H }, viewMode === ViewMode.List ? { width: W * 0.8 } : null]}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            >
              <PaddingTop />
              <TouchableOpacity activeOpacity={1}>
                <GridList colorScheme={colorScheme} />
                <ViewInstructions colorScheme={colorScheme} setOpen={setOpen} />
                <QuestionInformation />
                {viewMode === ViewMode.Grid ? <GridViewQuestions /> : <ListViewQuestions />}
                <View className='p-3.5 pt-2'>
                  <SmallBtn title='Submit Test' style={{ paddingVertical: 11 }} onPress={handleSubmit} />
                </View>
              </TouchableOpacity>
              <PaddingBottom />
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  )
})

const ListViewQuestions = React.memo(() => {
  const allQn = testStore((store) => store.allQn)
  const { setQnNo, qnNo } = currentQnStore()
  const setOpen = modalStore((store) => store.setOpen)

  return (
    <View className='px-4'>
      {allQn.map((qn, i) => (
        <View key={qn.questionId} className='flex-row items-center justify-between gap-4 py-1.5'>
          <Question
            qnNo={i}
            isActive={qnNo === i}
            isBookmarked={qn.isBookMarked || false}
            visited={qn.visited || false}
            isAnswered={!!qn.markedAnswer}
            onPress={() => {
              setQnNo(i)
              setOpen(false)
            }}
          />
          <Medium numberOfLines={1} className='text flex-shrink flex-grow-0 text-sm'>
            {qn.questionContent ? qn.questionContent.trim() : ''}
          </Medium>
        </View>
      ))}
    </View>
  )
})
