import React from 'react'
import { View } from 'react-native'
import SubjectGrid from './SubjectGrid'
import testStore from '@screens/Test/zustand/testStore'

const GridViewQuestions = React.memo(() => {
  const data = testStore((store) => store.testData)
  return (
    <View className='px-4'>
      {data?.test?.sections?.map((section, i) => (
        <SubjectGrid key={i} section={section} start={i * (section?.questions?.length || 0)} />
      ))}
    </View>
  )
})

export default GridViewQuestions
