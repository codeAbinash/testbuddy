import { Bold, Medium } from '@utils/fonts'
import { StackNav } from '@utils/types'
import { FC } from 'react'
import { View } from 'react-native'
import { Button } from './Button'
import { Lottie } from '@components/Lottie'
import Animations from '@assets/animations/animations'
import { W } from '@utils/dimensions'

type CounsellingProps = {
  navigation: StackNav
}

export const Counselling: FC<CounsellingProps> = ({ navigation }) => {
  return (
    <View className='flex-row items-center justify-between gap-2 px-5'>
      <View className='flex-1 gap-2'>
        <Bold className='text text-xl'>Predict College</Bold>
        <Medium className='text text-xs' style={{ fontSize: 10 }}>
          Predict your college based on your grades and interests.
        </Medium>
        <View className='flex-row'>
          <Button title='Predict Now' onPress={() => navigation.navigate('Counselling')} className='bg-accent' />
        </View>
      </View>
      <View className='flex-1'>
        <Lottie source={Animations.college} style={{ width: '100%', height: W * 0.5 }} loop={false} autoPlay={false} />
      </View>
    </View>
  )
}
