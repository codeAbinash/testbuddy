import { InformationCircleIcon } from '@assets/icons/icons'
import { PaddingBottom, PaddingTop } from '@components/SafePadding'
import { useNavigation } from '@react-navigation/native'
import { H } from '@utils/dimensions'
import { Medium } from '@utils/fonts'
import { ColorScheme, StackNav } from '@utils/types'
import React from 'react'
import { Modal, ScrollView, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import colors from 'tailwindcss/colors'

type ModalOptionsProps = {
  open: boolean
  isOpen: (open: boolean) => void
  colorScheme: ColorScheme
}

export const ModalOptions = React.memo<ModalOptionsProps>(({ open, isOpen, colorScheme }) => {
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
                <>
                  <Medium className='text px-4 pb-1 pt-2 text-xs opacity-70'>Options</Medium>
                  <ViewInstructions colorScheme={colorScheme} isOpen={isOpen} />
                </>
              </TouchableWithoutFeedback>
            </ScrollView>
          </View>
          <PaddingBottom />
        </TouchableOpacity>
      </Modal>
    </View>
  )
})

type ViewInstructionsProps = {
  colorScheme: ColorScheme
  isOpen: (open: boolean) => void
}

function ViewInstructions({ colorScheme, isOpen }: ViewInstructionsProps) {
  const navigation = useNavigation<StackNav>()
  return (
    <TouchableOpacity
      className='flex-row items-center p-3 dark:border-zinc-700'
      activeOpacity={0.7}
      onPress={() => {
        isOpen(false)
        navigation.navigate('Instructions')
      }}
    >
      <InformationCircleIcon
        width={17}
        height={17}
        color={colorScheme === 'dark' ? colors.zinc[300] : colors.zinc[700]}
      />
      <Medium className='text pb-0.5 pl-3 text-sm'>View Instructions</Medium>
    </TouchableOpacity>
  )
}
