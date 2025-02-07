import { SemiBold } from '@utils/fonts'
import { Image, TouchableOpacity, View, type ImageSourcePropType } from 'react-native'

const jeeAdv = require('../../../assets/images/src/jee-adv.png') as ImageSourcePropType

export default function ExploreTests() {
  return (
    <View className='mt-5'>
      <SemiBold className='text px-5 text-lg'>Explore Tests</SemiBold>
      <View className='mt-4 flex-row gap-3 px-5'>
        <TestElement image={jeeAdv} text='Test Series' />
        <TestElement image={jeeAdv} text='Mock Test' />
        <TestElement image={jeeAdv} text='Chapter wise PYQs' />
      </View>
      <View className='mt-4 flex-row gap-3 px-5'>
        <TestElement image={jeeAdv} text='Subject wise question' />
        <TestElement image={jeeAdv} text='Blogs' />
        <TestElement image={jeeAdv} text='PYQs' />
      </View>
    </View>
  )
}

type ExamElementProps = {
  image?: ImageSourcePropType
  text?: string
  description?: string
}
function TestElement({ image, text }: ExamElementProps) {
  return (
    <TouchableOpacity
      className='flex-1 items-center justify-center rounded-2xl bg-white pt-2 dark:bg-zinc-900'
      style={{
        shadowColor: '#00000055',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        elevation: 10,
        aspectRatio: 0.9,
      }}
      activeOpacity={0.7}
    >
      <Image source={image} style={{ width: 65, height: 65 }} />
      <SemiBold className='text px-3 pt-2 text-center text-sm opacity-90' numberOfLines={1}>
        {text}
      </SemiBold>
    </TouchableOpacity>
  )
}
