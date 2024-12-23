import { SmallBtn } from '@components/Button'
import { PaddingBottom, PaddingTop } from '@components/SafePadding'
import { H } from '@utils/dimensions'
import { ColorScheme } from '@utils/types'
import React from 'react'
import { Modal, ScrollView, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import modalStore from '../zustand/modalStore'
import GridList from './GridList'
import GridViewQuestions from './GridViewQuestions/GridViewQuestions'
import QuestionInformation from './QuestionInformation'
import ViewInstructions from './ViewInstructions'

type ModalOptionsProps = {
  colorScheme: ColorScheme
}

export const ModalOptions = React.memo<ModalOptionsProps>(({ colorScheme }) => {
  const { bottom, top } = useSafeAreaInsets()
  const setOpen = modalStore((store) => store.setOpen)
  const open = modalStore((store) => store.open)
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
          className='flex-1 items-end justify-start bg-black/20 p-5 pt-3 dark:bg-black/40'
        >
          <PaddingTop />
          <View className='rounded-2xl bg-white p-2 dark:bg-zinc-900'>
            <ScrollView
              className='w-[80%] flex-grow-0 rounded-xl'
              style={{ maxHeight: H - top - bottom - 50 }}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            >
              <TouchableOpacity activeOpacity={1}>
                <GridList colorScheme={colorScheme} />
                <ViewInstructions colorScheme={colorScheme} setOpen={setOpen} />
                <QuestionInformation />
                <GridViewQuestions />
                <View className='p-3.5 pt-2'>
                  <SmallBtn title='Submit Test' style={{ paddingVertical: 11 }} />
                </View>
              </TouchableOpacity>
            </ScrollView>
          </View>
          <PaddingBottom />
        </TouchableOpacity>
      </Modal>
    </View>
  )
})
