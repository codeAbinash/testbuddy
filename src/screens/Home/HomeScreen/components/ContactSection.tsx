import Animations from '@assets/animations/animations'
import { Lottie } from '@components/Lottie'
import { Bold, Medium } from '@utils/fonts'
import type { StackNav } from '@utils/types'
import { View } from 'react-native'
import { Button } from './Button'
import { W } from '@utils/dimensions'

export default function ContactSection({ navigation }: { navigation: StackNav }) {
  return (
    <View className='flex-row items-center justify-between px-5'>
      <View className='flex-1'>
        <Lottie
          source={Animations.contact}
          style={{ width: '100%', height: W * 0.5 }}
          loop={false}
          autoPlay={false}
          frame={60}
        />
      </View>
      <View className='flex-1 gap-2'>
        <Bold className='text text-xl'>Contact Us</Bold>
        <Medium className='text text-xs' style={{ fontSize: 10 }}>
          Have a question? Reach out—we're here to help!
        </Medium>
        <View className='flex-row'>
          <Button title='Write to us' onPress={() => navigation.navigate('Refer')} className='bg-violet-500' />
        </View>
      </View>
    </View>
  )
}
