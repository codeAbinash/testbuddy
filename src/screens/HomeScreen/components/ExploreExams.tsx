import { SemiBold } from '@utils/fonts'
import { Image, TouchableOpacity, View, type ImageSourcePropType } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'

const jeeAdv = require('../../../assets/images/src/jee-adv.png') as ImageSourcePropType

export default function ExploreExams() {
  const data = Array(10).fill({ image: jeeAdv, text: 'JEE Advanced' })

  return (
    <View className='mt-5'>
      <SemiBold className='text px-5 text-lg'>Explore Exams</SemiBold>
      <FlatList
        horizontal
        data={data}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 10, gap: 15 }}
      />
      <FlatList
        horizontal
        data={data}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 10, gap: 15 }}
      />
    </View>
  )
}

const renderItem = ({ item }: { item: any }) => <ExamElement image={item.image} text={item.text} />

type ExamElementProps = { image?: ImageSourcePropType; text?: string; description?: string }
function ExamElement({ image, text }: ExamElementProps) {
  return (
    <TouchableOpacity
      className='items-center justify-center rounded-2xl bg-white pt-2 dark:bg-zinc-900'
      style={{
        shadowColor: '#00000055',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 15,
        elevation: 5,
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
