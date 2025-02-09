import { Medium, SemiBold } from '@utils/fonts'
import { Image, TouchableOpacity, View, type ImageSourcePropType } from 'react-native'

const jeeAdv = require('../../../assets/images/src/jee-adv.png') as ImageSourcePropType

export default function ExploreTests() {
  return (
    <View className='mt-5'>
      <SemiBold className='text px-5 text-lg'>Explore Tests</SemiBold>
      <View className='mt-4 flex-row gap-3 px-5'>
        <TestElement image={jeeAdv} text='Test Series' description='12 Test Papers | 3 Chapters' />
        <TestElement image={jeeAdv} text='Mock Test' description='5 Mock Tests Available' />
        <TestElement image={jeeAdv} text='Chapter wise PYQs' description='All Chapters Covered' />
      </View>
      <View className='mt-4 flex-row gap-3 px-5'>
        <TestElement image={jeeAdv} text='Subject wise question' description='Variety of Questions Available' />
        <TestElement image={jeeAdv} text='Blogs' description='Latest Articles and Updates' />
        <TestElement image={jeeAdv} text='PYQs' description='Previous Year Questions' />
      </View>
    </View>
  )
}

type ExamElementProps = { image?: ImageSourcePropType; text?: string; description?: string }
function TestElement({ image, text, description }: ExamElementProps) {
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
      <Medium className='px-3 text-center text-xs opacity-70' numberOfLines={1} style={{ fontSize: 9 }}>
        {description}
      </Medium>
    </TouchableOpacity>
  )
}
