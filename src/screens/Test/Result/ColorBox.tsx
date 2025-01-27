import { Medium, SemiBold } from '@utils/fonts'
import { View } from 'react-native'

type ColorBoxProps = {
  value: number | string
  label: string
  bgColor: string
  textColor: string
  animDelay?: number
}

const ColorBox = ({ value, label, bgColor, textColor, animDelay }: ColorBoxProps) => {
  return (
    <View className='flex-1'>
      {/* <Animated.View className='flex-1' entering={FadeInUp.duration(200).delay(animDelay || 0)}> */}
      <View className={`aspect-square w-full items-center justify-center rounded-full ${bgColor}`}>
        <SemiBold className={`mb-1 ${textColor}`}>{value}</SemiBold>
      </View>
      <Medium className='text mt-2 text-center text-xs opacity-80'>{label}</Medium>
    </View>
  )
}

export default ColorBox
