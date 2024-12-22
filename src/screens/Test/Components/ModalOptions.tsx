import { SmallBtn } from '@components/Button'
import { PaddingBottom, PaddingTop } from '@components/SafePadding'
import { H } from '@utils/dimensions'
import { ColorScheme } from '@utils/types'
import React from 'react'
import { Modal, ScrollView, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import GridList from './GridList'
import GridViewQuestions from './GridViewQuestions'
import QuestionInformation from './QuestionInformation'
import ViewInstructions from './ViewInstructions'

type ModalOptionsProps = {
  open: boolean
  isOpen: (open: boolean) => void
  colorScheme: ColorScheme
}

export const ModalOptions = React.memo<ModalOptionsProps>(({ open, isOpen, colorScheme }) => {
  const { bottom, top } = useSafeAreaInsets()
  if (!open) return null
  return (
    <View>
      <Modal
        animationType='slide'
        transparent={true}
        visible={open}
        hardwareAccelerated
        statusBarTranslucent
        onRequestClose={() => isOpen(false)}
      >
        <TouchableOpacity
          onPress={() => isOpen(false)}
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
                <ViewInstructions colorScheme={colorScheme} isOpen={isOpen} />
                <QuestionInformation />
                <GridViewQuestions />
                <View className='p-3.5 pt-2'>
                  <SmallBtn title='Submit Test' />
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
