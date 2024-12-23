import React from 'react'
import { View } from 'react-native'
import testStore from '../../zustand/testStore'
import SubjectGrid from './SubjectGrid'

const GridViewQuestions = React.memo((props) => {
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
