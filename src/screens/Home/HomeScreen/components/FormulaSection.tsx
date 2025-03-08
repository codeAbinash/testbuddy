import Animations from '@assets/animations/animations'
import { Lottie } from '@components/Lottie'
import { Bold, Medium } from '@utils/fonts'
import type { StackNav } from '@utils/types'
import { View } from 'react-native'
import { Button } from './Button'
import { W } from '@utils/dimensions'

export default function FormulaSection({ navigation }: { navigation: StackNav }) {
  return (
    <View className='flex-row items-center justify-between gap-2 px-5'>
      <View className='flex-1 gap-2'>
        <Bold className='text text-xl'>Formula Buddy</Bold>
        <Medium className='text text-xs' style={{ fontSize: 10 }}>
          Formula Buddy: Your compact companion for understanding and recalling essential formulas with ease.
        </Medium>
        <View className='flex-row'>
          <Button title='Explore Now' onPress={() => navigation.navigate('Refer')} className='bg-rose-500' />
        </View>
      </View>
      <View className='flex-1'>
        <Lottie
          source={Animations.formula}
          style={{ width: '100%', height: W * 0.5 }}
          loop={false}
          autoPlay={false}
          frame={100}
        />
      </View>
    </View>
  )
}
