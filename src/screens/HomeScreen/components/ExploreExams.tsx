import { SemiBold } from '@utils/fonts'
import { Image, TouchableOpacity, View, type ImageSourcePropType } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

const jeeAdv = require('../../../assets/images/src/jee-adv.png') as ImageSourcePropType

export default function ExploreExams() {
  return (
    <View className='mt-5'>
      <SemiBold className='text px-5 text-lg'>Explore Exams</SemiBold>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View className='flex-row gap-3.5 p-5 pt-4'>
          {Array(10)
            .fill(0)
            .map((_, i) => (
              <ExamElement key={i} image={jeeAdv} text='JEE Advanced' />
            ))}
        </View>
      </ScrollView>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View className='flex-row gap-3.5 p-5 pt-4'>
          {Array(10)
            .fill(0)
            .map((_, i) => (
              <ExamElement key={i} image={jeeAdv} text='JEE Advanced' />
            ))}
        </View>
      </ScrollView>
    </View>
  )
}

type ExamElementProps = { image?: ImageSourcePropType; text?: string; description?: string }
function ExamElement({ image, text }: ExamElementProps) {
  return (
    <TouchableOpacity
      className='items-center justify-center rounded-2xl bg-white pt-2 dark:bg-zinc-900'
      style={{
        shadowColor: '#00000055',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        elevation: 10,
        height: 110,
        width: 100,
      }}
      activeOpacity={0.7}
    >
      <Image source={image} style={{ width: 65, height: 65 }} />
      <SemiBold className='text px-3 py-2 text-center text-xs opacity-90'>{text}</SemiBold>
    </TouchableOpacity>
  )
}
