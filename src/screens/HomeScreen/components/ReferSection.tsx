import Animations from '@assets/animations/animations'
import { Lottie } from '@components/Lottie'
import { Bold, Medium } from '@utils/fonts'
import type { StackNav } from '@utils/types'
import { View } from 'react-native'
import { Button } from './Button'

export default function ReferSection({ navigation }: { navigation: StackNav }) {
  return (
    <View className='flex-row items-center justify-between px-5 mt-5'>
      <View className='flex-[1.5]'>
        <Lottie source={Animations.refer} style={{ width: '100%' }} />
      </View>
      <View className='flex-1 gap-2'>
        <Bold className='text text-xl'>EARN ₹100!</Bold>
        <Medium className='text text-xs' style={{ fontSize: 10 }}>
          Invite your parents to the app today and unlock exciting rewards for both you and them!
        </Medium>
        <View className='flex-row'>
          <Button title='Invite a friend' onPress={() => navigation.navigate('Refer')} className='bg-violet-500' />
        </View>
      </View>
    </View>
  )
}
