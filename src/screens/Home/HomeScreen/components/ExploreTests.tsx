import images from '@assets/images/images'
import { Medium, SemiBold } from '@utils/fonts'
import type { StackNav } from '@utils/types'
import { Image, TouchableOpacity, View, type ImageSourcePropType, type TouchableOpacityProps } from 'react-native'

export default function ExploreTests({ navigation }: { navigation: StackNav }) {
  return (
    <View className='mt-5'>
      <SemiBold className='text px-5 text-lg'>Explore Tests</SemiBold>
      <View className='mt-4 flex-row gap-3 px-5'>
        <TestElement
          image={images.jeeAdv}
          text='Test Series'
          description='12 Test Papers | 3 Chapters'
          onPress={() => navigation.navigate('Tests')}
        />
        <TestElement image={images.jeeAdv} text='Mock Test' description='5 Mock Tests Available' />
        <TestElement image={images.jeeAdv} text='Chapter wise PYQs' description='All Chapters Covered' />
      </View>
      <View className='mt-4 flex-row gap-3 px-5'>
        <TestElement image={images.jeeAdv} text='Subject wise question' description='Variety of Questions Available' />
        <TestElement image={images.jeeAdv} text='Blogs' description='Latest Articles and Updates' />
        <TestElement image={images.jeeAdv} text='PYQs' description='Previous Year Questions' />
      </View>
    </View>
  )
}

type ExamElementProps = {
  image?: ImageSourcePropType
  text?: string
  description?: string
} & TouchableOpacityProps

function TestElement({ image, text, description, ...rest }: ExamElementProps) {
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
      {...rest}
    >
      <Image source={image} style={{ width: 65, height: 65 }} />
      <SemiBold className='text px-3 pt-2 text-center text-sm opacity-90' numberOfLines={1}>
        {text}
      </SemiBold>
      <Medium className='text px-3 text-center text-xs opacity-70' numberOfLines={1} style={{ fontSize: 9 }}>
        {description}
      </Medium>
    </TouchableOpacity>
  )
}
