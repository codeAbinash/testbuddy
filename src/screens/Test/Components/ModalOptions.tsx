import { PaddingBottom, PaddingTop } from '@components/SafePadding'
import { H } from '@utils/dimensions'
import { Medium } from '@utils/fonts'
import React from 'react'
import { Modal, ScrollView, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export const ModalOptions = React.memo<{ open: boolean; isOpen: (open: boolean) => void }>(({ open, isOpen }) => {
  const { bottom, top } = useSafeAreaInsets()
  return (
    <View>
      <Modal
        animationType='fade'
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
          <View className='rounded-xl bg-white p-2 dark:bg-zinc-800'>
            <ScrollView
              className='w-[80%] flex-grow-0 rounded-xl'
              style={{ maxHeight: H - top - bottom - 50 }}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            >
              <TouchableWithoutFeedback>
                <Medium className='text text-sm'>Option 1</Medium>
              </TouchableWithoutFeedback>
            </ScrollView>
          </View>
          <PaddingBottom />
        </TouchableOpacity>
      </Modal>
    </View>
  )
})
