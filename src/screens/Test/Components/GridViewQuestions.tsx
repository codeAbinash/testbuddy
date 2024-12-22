import { Medium, SemiBold } from '@utils/fonts'
import { TouchableOpacity, View } from 'react-native'
import testStore from '../zustand/testStore'

export default function GridViewQuestions() {
  const data = testStore((store) => store.testData)
  return (
    <View className='px-4'>
      {data?.test?.sections?.map((section, sectionIndex) => (
        <View key={sectionIndex} className='mb-4'>
          <SemiBold className='text px-0.5 text-sm capitalize'>{section.subject}</SemiBold>
          <View className='mt-2 flex-row flex-wrap justify-between gap-2.5'>
            {section.questions?.map((_, questionIndex) => <Question key={questionIndex} no={questionIndex + 1} />)}
          </View>
        </View>
      ))}
    </View>
  )
}

function Question({ no }: { no: number }) {
  return (
    <TouchableOpacity
      className='h-11 w-9 items-center justify-center rounded-md rounded-tl-2xl bg-blue-500'
      activeOpacity={0.7}
    >
      <Medium className='text-sm text-white'>{no}</Medium>
    </TouchableOpacity>
  )
}
