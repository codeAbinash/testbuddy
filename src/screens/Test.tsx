import popupStore from '@/zustand/popupStore'
import Btn from '@components/Button'
import { PaddingBottom, PaddingTop } from '@components/SafePadding'
import { Medium } from '@utils/fonts'
import type { NavProps } from '@utils/types'
import { View } from 'react-native'

export default function Test({ navigation }: NavProps) {
  const alert = popupStore((store) => store.alert)

  return (
    <View className='flex-1 px-5'>
      <PaddingTop />
      <Medium className='mb-5 text-center text-base text-black dark:text-white'>
        This is a test Screen. Functional and state based custom Modal Alert testing for this application.
      </Medium>
      <View className='relative'>
        <Btn onPress={() => {}}>Open Modal</Btn>
        <View className='absolute z-10 mt-12 flex w-full bg-red-500'>
          <Medium>Hello World Lorem This is Abinash Karmakar THis is the code the best code ever written</Medium>
        </View>
      </View>
      <Medium className='mt-5 text-black dark:text-white'>
        Go to{' '}
        <Medium className='link' onPressOut={() => navigation.navigate('Splash')}>
          Splash Screen
        </Medium>
      </Medium>
      <PaddingBottom />
    </View>
  )
}

function Dropdown() {
  return (
    <View className='relative'>
      <View className='absolute z-10 mt-12 flex w-full bg-red-500'>
        <Medium>Hello World Lorem This is Abinash Karmakar THis is the code the best code ever written</Medium>
      </View>
    </View>
  )
}
