import { PaddingBottom } from '@components/SafePadding'
import api from '@query/api'
import { RouteProp } from '@react-navigation/native'
import BackHeader from '@screens/BackHeader'
import { useSuspenseQuery } from '@tanstack/react-query'
import { Medium, Regular, SemiBold } from '@utils/fonts'
import { StackNav } from '@utils/types'
import React, { useEffect } from 'react'
import { View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

type ParamList = {
  Result: ResultParamList
}

export type ResultParamList = {
  testId: string
}

type ResultProps = {
  route: RouteProp<ParamList, 'Result'>
  navigation: StackNav
}

export default function Result({ navigation, route }: ResultProps) {
  const { testId } = route.params

  const { data } = useSuspenseQuery({
    queryKey: ['test', testId],
    queryFn: () => api.startTest({ testId }),
  })

  useEffect(() => {
    console.log(data?.result)
  }, [data])

  return (
    <>
      <BackHeader title='Results' navigation={navigation} />
      <ScrollView className='screen-bg flex-1 gap-5 px-5 py-5'>
        <View className='mt-10 rounded-xl'>
          <Regular className='text text-center text-8xl'>
            <React.Suspense fallback={'Loading...'}>{data?.result?.marks || 0}</React.Suspense>
          </Regular>
          <Medium className='text mt-3 text-center text-xl'>Your Marks</Medium>
        </View>
        <View className='mx-auto w-4/5'>
          <Regular className='text text-center text-sm'>
            You have attempted {data?.result?.attemptedQuestions || 0} questions out of{' '}
            {data?.result?.totalQuestions || 0} and got {data?.result?.correctAnswers || 0} correct answers.
          </Regular>
        </View>
        <View>
          <Medium className='text mt-5 text-xs'>
            Total Questions: {data?.result?.totalQuestions || 0}
            {'\n'}
            Correct Answers: {data?.result?.correctAnswers || 0}
            {'\n'}
            Attempted Questions: {data?.result?.attemptedQuestions || 0}
            {'\n'}
            Marked Questions: {data?.result?.markedQuestions || 0}
            {'\n'}
            Visited Questions: {data?.result?.visitedQuestions || 0}
            {'\n'}
            Percentage Correct: {data?.result?.percentageCorrect || 0}
            {'\n'}
            Total Positive Marks: {data?.result?.totalPositiveMarks || 0}
            {'\n'}
            Total Negative Marks: {data?.result?.totalNegativeMarks || 0}
            {'\n'}
            Marks: {data?.result?.marks || 0}
            {'\n'}
          </Medium>
        </View>
        <View>
          <SemiBold className='text mt-5 text-lg'>Scorecard</SemiBold>
          {data?.result?.scorecard?.map((score, i) => (
            <View key={i} className='mt-3'>
              <Medium className='text text-sm capitalize'>{score.sectionName}</Medium>
              <Medium className='text text-xs'>
                Total Questions: {score.totalQuestions}
                {'\n'}
                Correct: {score.correct}
                {'\n'}
                Incorrect: {score.incorrect}
                {'\n'}
                Attempted: {score.attempted}
                {'\n'}
                Skipped: {score.skipped}
                {'\n'}
                Accuracy Percentage: {score.accuracyPercentage}
                {'\n'}
                Attempted Percentage: {score.attemptedPercentage}
                {'\n'}
                Percentile: {score.percentile}
                {'\n'}
              </Medium>
            </View>
          ))}
        </View>
        <View>
          <SemiBold className='text mt-5 text-lg'>Difficulty Analysis</SemiBold>
          {data?.result?.difficultyAnalysis?.map((diff, i) => (
            <View key={i} className='mt-3'>
              <Medium className='text text-sm capitalize'>{diff.subject}</Medium>
              {diff.levels?.map((level, j) => (
                <View key={j} className='mt-3'>
                  <Medium className='text text-xs capitalize'>{level.level}</Medium>
                  {level.questions?.slice(0, 5).map((qn, k) => (
                    <View key={k} className='mt-3'>
                      <Medium className='text text-xs'>
                        Question Id: {qn.questionId}
                        {'\n'}
                        QNumber: {qn.qNumber}
                        {'\n'}
                        Status: {qn.status}
                        {'\n'}
                      </Medium>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          ))}
        </View>
        <View>
          <SemiBold className='text mt-5 text-lg'>Time Spent Analysis</SemiBold>
          <Medium className='text text-sm'>
            Total Time Spent On Correct: {data?.result?.timeSpentAnalysis?.totalTimeSpentOnCorrect}
            {'\n'}
            Total Time Spent On Incorrect: {data?.result?.timeSpentAnalysis?.totalTimeSpentOnIncorrect}
            {'\n'}
            Total Time Spent On Unattempted: {data?.result?.timeSpentAnalysis?.totalTimeSpentOnUnattempted}
            {'\n'}
          </Medium>
          {data?.result?.timeSpentAnalysis?.questionWiseAnalysis?.slice(0, 5).map((qn, i) => (
            <View key={i} className='mt-3'>
              <Medium className='text text-sm'>
                Question Id: {qn.questionId}
                {'\n'}
                My Answer: {qn.myAnswer}
                {'\n'}
                Correct Answer: {qn.correctAnswer}
                {'\n'}
                Status: {qn.status}
                {'\n'}
                Difficulty Level: {qn.difficultyLevel}
                {'\n'}
                Time Spent By Me: {qn.timeSpentByMe}
                {'\n'}
                Time Spent By Those Who Got Right: {qn.timeSpentByThoseWhoGotRight}
                {'\n'}
                Time Spent By Topper: {qn.timeSpentByTopper}
                {'\n'}
              </Medium>
            </View>
          ))}
        </View>
        <View>
          <Medium className='text mb-10 mt-5 text-center text-base'>End of the Result</Medium>
        </View>
        <PaddingBottom />
      </ScrollView>
    </>
  )
}
