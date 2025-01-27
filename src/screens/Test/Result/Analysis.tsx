import { PaddingBottom } from '@components/SafePadding'
import TopBar from '@components/TopBar'
import api from '@query/api'
import { RouteProp } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query'
import { W } from '@utils/dimensions'
import { Medium, Regular, SemiBold } from '@utils/fonts'
import { StackNav } from '@utils/types'
import React, { useEffect } from 'react'
import { StatusBar, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import ColorBox from './ColorBox'
import Scorecard from './components/Scorecard'

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

  const { data } = useQuery({
    queryKey: ['test', testId],
    queryFn: () => api.startTest({ testId }),
  })

  useEffect(() => {
    console.log(data?.result)
  }, [data])

  return (
    <>
      <StatusBar barStyle='default' />
      <View className='pb-5'>
        <TopBar />
      </View>
      <ScrollView className='screen-bg flex-1 gap-5 px-5 py-5'>
        <View className='mt-10 rounded-xl'>
          <Regular className='text text-center text-8xl'>
            <React.Suspense fallback={'Loading...'}>{data?.result?.marks || 0}</React.Suspense>
          </Regular>
          <Medium className='text mt-3 text-center text-xl'>Your Marks</Medium>
        </View>
        <View className='mx-auto mt-2 w-4/5'>
          <Regular className='text text-center text-sm'>
            You have attempted {data?.result?.attemptedQuestions || 0} questions out of{' '}
            {data?.result?.totalQuestions || 0} and got {data?.result?.correctAnswers || 0} correct answers.
          </Regular>
        </View>
        <View>
          <View style={{ width: W - 40 }} className='mx-auto mt-8 flex-row justify-between gap-4'>
            <ColorBox
              value={(data?.result?.totalPositiveMarks || 0) + 20}
              label='Positive Marks'
              bgColor='bg-green-500/20'
              textColor='text-green-500'
              animDelay={100}
            />
            <ColorBox
              value={(data?.result?.totalNegativeMarks || 0) + 20}
              label='Negative Marks'
              bgColor='bg-red-500/20'
              textColor='text-red-500'
              animDelay={200}
            />
            <ColorBox
              value={data?.result?.attemptedQuestions || 0}
              label='Attempted Questions'
              bgColor='bg-blue-500/20'
              textColor='text-blue-500'
              animDelay={300}
            />
            <ColorBox
              value={data?.result?.correctAnswers || 0}
              label='Correct Answers'
              bgColor='bg-green-500/20'
              textColor='text-green-500'
              animDelay={400}
            />
            <ColorBox
              value={data?.result?.percentageCorrect?.toFixed(2) || 0}
              label='Percentage Correct'
              bgColor='bg-yellow-500/20'
              textColor='text-yellow-500'
              animDelay={500}
            />
          </View>
        </View>
        {/* <View>
          <Medium className='text mt-5 text-xs'>
            Marked Questions: {data?.result?.markedQuestions || 0}
            {'\n'}
            Visited Questions: {data?.result?.visitedQuestions || 0}
          </Medium>
        </View> */}
        <View className='gap-5'>
          <SemiBold className='text mt-8 text-center text-lg'>Scorecard</SemiBold>
          {data?.result?.scorecard?.map((score, i) => (
            // <View key={i} className='mt-3'>
            //   <Medium className='text text-sm capitalize'>{score.sectionName}</Medium>
            //   <Medium className='text text-xs'>
            //     Total Questions: {score.totalQuestions}
            //     Accuracy Percentage: {score.accuracyPercentage}
            //     {'\n'}
            //     Attempted Percentage: {score.attemptedPercentage}
            //     {'\n'}
            //     Percentile: {score.percentile}
            //     {'\n'}
            //   </Medium>
            // </View>
            <Scorecard score={score} key={score.sectionName} i={i + 2} />
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
