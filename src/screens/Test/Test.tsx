import { More03Icon } from '@assets/icons/icons'
import Press from '@components/Press'
import { PaddingBottom, PaddingTop } from '@components/SafePadding'
import api from '@query/api'
import { RouteProp } from '@react-navigation/native'
import BackHeader from '@screens/BackHeader'
import { useQuery } from '@tanstack/react-query'
import { H } from '@utils/dimensions'
import { Medium } from '@utils/fonts'
import type { ColorScheme, StackNav } from '@utils/types'
import { useColorScheme } from 'nativewind'
import { useState } from 'react'
import {
  Modal,
  ScrollView,
  TouchableOpacity,
  TouchableOpacityProps,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import colors from 'tailwindcss/colors'

type ParamList = {
  Test: TestParamList
}

export type TestParamList = {
  testId: string
}

type TestProps = {
  route: RouteProp<ParamList, 'Test'>
  navigation: StackNav
}

export default function Test({ navigation, route }: TestProps) {
  const { colorScheme } = useColorScheme()
  const { testId } = route.params
  const [open, isOpen] = useState(false)

  const { data } = useQuery({
    queryKey: ['test', testId],
    queryFn: () => api.startTest({ testId }),
  })

  return (
    <>
      <BackHeader
        title={data?.test.testTitle || 'Loading...'}
        navigation={navigation}
        Right={<MoreOption colorScheme={colorScheme} onPress={() => isOpen(true)} />}
      />
      <ModalOptions open={open} isOpen={isOpen} />
      <ScrollView contentContainerClassName='px-5 py-3 gap-5 screen-bg flex-1'></ScrollView>
    </>
  )
}

function MoreOption({ colorScheme, ...rest }: { colorScheme: ColorScheme } & TouchableOpacityProps) {
  return (
    <Press {...rest} className='p-2'>
      <More03Icon width={22} height={22} color={colorScheme === 'dark' ? colors.zinc[300] : colors.zinc[700]} />
    </Press>
  )
}

function ModalOptions({ open, isOpen }: { open: boolean; isOpen: (open: boolean) => void }) {
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
          className='flex-1 items-end justify-start bg-black/20 p-5 pt-3 dark:bg-black/30'
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
}
