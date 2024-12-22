import Btn from '@components/Button'
import { PaddingBottom } from '@components/SafePadding'
import TopBar from '@components/TopBar'
import { SemiBold } from '@utils/fonts'
import { NavProps } from '@utils/types'
import { useColorScheme } from 'nativewind'
import { StatusBar, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import MathJax from './Math/MathJax'
import testStore from './zustand/testStore'

export default function Instructions({ navigation }: NavProps) {
  const data = testStore((store) => store.testData)
  const { colorScheme } = useColorScheme()
  return (
    <>
      <StatusBar barStyle='default' />
      <View className='flex-1'>
        <View>
          <TopBar />
          <SemiBold className='text mb-2 mt-1 text-center text-lg'>Instructions</SemiBold>
        </View>
        <ScrollView className='flex-1' contentContainerClassName='px-5 bg-zinc-50 dark:bg-black'>
          <MathJax
            html={data?.test?.instructions}
            colorScheme={colorScheme}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          />
        </ScrollView>
        <View className='px-5 pb-2 pt-4'>
          <Btn onPress={() => navigation.goBack()} title='Got It' />
          <PaddingBottom />
        </View>
      </View>
    </>
  )
}
