import { View } from 'react-native'

import Animations from '@assets/animations/animations'
import { H, W } from '@utils/dimensions'
import { Medium } from '@utils/fonts'
import { FC } from 'react'
import { Lottie } from './Lottie'

type NoDataProps = {
  text?: string
}
const NoData: FC<NoDataProps> = ({ text }) => {
  return (
    <View className='items-center justify-center' style={{ height: H * 0.7 }}>
      <Lottie source={Animations['no-data']} style={{ height: W * 0.65, width: W * 0.65 }} />
      <Medium className='text text-center text-sm'>{text || 'Nothing to show here'}</Medium>
    </View>
  )
}

export default NoData
