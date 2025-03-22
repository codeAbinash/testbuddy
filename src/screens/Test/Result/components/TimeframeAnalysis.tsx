import { FC, useMemo } from 'react'
import { View } from 'react-native'
import { Result } from '../types/result'

import { W } from '@utils/dimensions'
import { CurveType, LineChart } from 'react-native-gifted-charts'
import colors from 'tailwindcss/colors'

type SubjectWiseProps = {
  result?: Result
}

const TimeframeAnalysis: FC<SubjectWiseProps> = ({ result }) => {
  const metrics = useMemo(() => {
    const data = result?.performanceTimeMetrics?.map((item) => ({
      correct: { value: item.correctAnswers },
      incorrect: { value: item.incorrectAnswers },
      attempt: { value: item.questionsAttempts },
      accuracy: { value: item.accuracy },
    }))

    const correct = data?.map((item) => item.correct)
    const incorrect = data?.map((item) => item.incorrect)
    const attempt = data?.map((item) => item.attempt)
    const accuracy = data?.map((item) => item.accuracy)

    const maxValue = Math.max(
      ...(data?.flatMap((item) => [
        item.correct.value,
        item.incorrect.value,
        item.attempt.value,
        item.accuracy.value,
      ]) || []),
    )

    return { correct, incorrect, attempt, accuracy, maxValue }
  }, [result])

  const { correct, incorrect, attempt, accuracy, maxValue } = metrics

  return (
    <View style={{ flex: 1 }}>
      <LineChart
        isAnimated
        data={correct}
        data2={incorrect}
        data3={attempt}
        data4={accuracy}
        spacing={20}
        color1={colors.purple[500]}
        color2={colors.red[500]}
        color3={colors.blue[500]}
        color4={colors.green[500]}
        hideDataPoints1
        hideDataPoints2
        hideDataPoints3
        hideDataPoints4
        width={W}
        maxValue={maxValue}
        xAxisColor={colors.zinc[500] + '55'}
        yAxisColor={colors.zinc[500] + '55'}
        curveType={CurveType.CUBIC}
      />
    </View>
  )
}

export default TimeframeAnalysis
