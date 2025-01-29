import { PaddingBottom } from '@components/SafePadding'
import TopBar from '@components/TopBar'
import { RouteProp } from '@react-navigation/native'
import { Medium, Regular, SemiBold } from '@utils/fonts'
import { StackNav } from '@utils/types'
import { useInteraction } from '@utils/utils'
import React, { useEffect } from 'react'
import { StatusBar, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import useTestQuery from '../hooks/useTestQuery'
import { ColorBoxes } from './ColorBox'
import { Attempt, AttemptColors } from './components/Attempt'
import Difficulty, { DifficultyColors } from './components/Difficulty'
import QuestionWise from './components/QuestionWise'
import Scorecard from './components/Scorecard'
import TimeSpend from './components/TimeSpend'

type ParamList = {
  Analysis: AnalysisParams
}

export type AnalysisParams = {
  testId: string
}

type AnalysisProps = {
  route: RouteProp<ParamList, 'Analysis'>
  navigation: StackNav
}

export default function Analysis({ route }: AnalysisProps) {
  const { testId } = route.params
  const lazy = useInteraction()

  const { data } = useTestQuery(testId)

  useEffect(() => {
    console.log(data?.result?.timeSpentAnalysis?.questionWiseAnalysis)
  }, [data])

  return (
    <>
      <StatusBar barStyle='default' />
      <View className='pb-5'>
        <TopBar />
      </View>
      <ScrollView className='screen-bg flex-1 px-5 py-5' contentContainerClassName='pb-10 gap-12'>
        <View className='mt-10 rounded-xl'>
          <Regular className='text text-center text-8xl'>
            <React.Suspense fallback={'Loading...'}>{data?.result?.marks || 0}</React.Suspense>
          </Regular>
          <Medium className='text mt-3 text-center text-xl'>Your Marks</Medium>
          <View className='mx-auto mt-2 w-4/5'>
            <Regular className='text text-center text-sm'>
              You have attempted {data?.result?.attemptedQuestions || 0} questions out of{' '}
              {data?.result?.totalQuestions || 0} and got {data?.result?.correctAnswers || 0} correct answers.
            </Regular>
          </View>
          <ColorBoxes result={data?.result} />
        </View>
        <View className='gap-3'>
          <SemiBold className='text mb-3 text-center text-xl'>Scorecard</SemiBold>
          {data?.result?.scorecard?.map((score, i) => <Scorecard score={score} key={score.sectionName} i={i + 2} />)}
        </View>
        {lazy && (
          <>
            <View className='gap-3'>
              <SemiBold className='text text-center text-xl'>Difficulty Analysis</SemiBold>
              {data?.result?.difficultyAnalysis?.map((diff, i) => <Difficulty diff={diff} key={i} />)}
              <DifficultyColors />
            </View>
            <View className='gap-3.5'>
              <SemiBold className='text text-center text-xl'>Time Spent Analysis</SemiBold>
              <TimeSpend timeSpentAnalysis={data?.result?.timeSpentAnalysis} />
            </View>
            <View className='gap-3'>
              <SemiBold className='text text-center text-xl'>Attempt Analysis</SemiBold>
              {data?.result?.difficultyAnalysis?.map((diff, i) => <Attempt diff={diff} key={i} />)}
              <AttemptColors />
            </View>
            <View className='gap-3'>
              <SemiBold className='text text-center text-xl'>Questionwise Analysis</SemiBold>
              <QuestionWise q={data?.result?.timeSpentAnalysis?.questionWiseAnalysis} />
            </View>
          </>
        )}
        <PaddingBottom />
      </ScrollView>
    </>
  )
}
