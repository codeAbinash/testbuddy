import { PaddingBottom, PaddingTop } from '@components/SafePadding'
import TopBar from '@components/TopBar'
import { RouteProp } from '@react-navigation/native'
import { Medium, Regular, SemiBold } from '@utils/fonts'
import { StackNav } from '@utils/types'
import React from 'react'
import { View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import useTestQuery from '../hooks/useTestQuery'
import { ColorBoxes } from './ColorBox'
import { AttemptColors, DifficultyV2 } from './components/Difficulty'
import QuestionWise from './components/QuestionWise'
import Scorecard, { ScoreboardTable } from './components/Scorecard'
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
  const { data } = useTestQuery(testId)

  return (
    <>
      <View className='bg-screen pb-5'>
        <PaddingTop />
        <TopBar />
      </View>
      <ScrollView className='bg-screen flex-1 px-5 py-5' contentContainerClassName='pb-10 gap-12'>
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
          <ScoreboardTable board={data?.result?.scorecard!} />
        </View>
        <View className='gap-3.5'>
          <SemiBold className='text text-center text-xl'>Time Spent Analysis</SemiBold>
          <TimeSpend timeSpentAnalysis={data?.result?.timeSpentAnalysis} />
        </View>
        <View className='gap-3'>
          <SemiBold className='text text-center text-xl'>Difficulty Analysis</SemiBold>
          {data?.result?.difficultyAnalysis?.map((diff, i) => <DifficultyV2 diff={diff} key={i} />)}
          <AttemptColors />
        </View>
        {/* <View className='gap-3'>
              <SemiBold className='text text-center text-xl'>Attempt Analysis</SemiBold>
              {data?.result?.difficultyAnalysis?.map((diff, i) => <Attempt diff={diff} key={i} />)}
              <AttemptColors />
            </View> */}
        <View className='gap-3'>
          <SemiBold className='text text-center text-xl'>Questionwise Analysis</SemiBold>
          <QuestionWise q={data?.result?.timeSpentAnalysis?.questionWiseAnalysis} />
        </View>
        <PaddingBottom />
      </ScrollView>
    </>
  )
}
