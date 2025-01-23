import { SmallBtn } from '@components/Button'
import { PaddingBottom, PaddingTop } from '@components/SafePadding'
import currentQnStore from '@screens/Test/zustand/currentQn'
import testStore from '@screens/Test/zustand/testStore'
import { H, W } from '@utils/dimensions'
import { Medium } from '@utils/fonts'
import { ColorScheme } from '@utils/types'
import React from 'react'
import { Modal, ScrollView, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
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
  const { bottom, top } = useSafeAreaInsets()
  const setOpen = modalStore((store) => store.setOpen)
  const open = modalStore((store) => store.open)
  const viewMode = modalStore((store) => store.viewMode)

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
                  <SmallBtn title='Submit Test' style={{ paddingVertical: 11 }} />
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
