import { DocumentValidationStrokeRoundedIcon, MultiplicationSignIcon } from '@assets/icons/icons'
import Input from '@components/Input'
import Label from '@components/Label'
import { Medium } from '@utils/fonts'
import { type mode } from '@utils/types'
import { timeDiffFromNow } from '@utils/utils'
import React, { useCallback } from 'react'
import { TouchableOpacity, View } from 'react-native'
import colors from 'tailwindcss/colors'
import useUpdateTestMutation from '../hooks/useUpdateTestMutation'
import currentQnStore from '../zustand/currentQn'
import testStore from '../zustand/testStore'
import timeStore from '../zustand/timeStore'

const NumericalOptions = React.memo(({ mode }: { mode: mode }) => {
  const allQn = testStore((store) => store.allQn)
  const qnNo = currentQnStore((store) => store.qnNo)
  const setAllQn = testStore((store) => store.setAllQn)
  const qn = allQn?.[qnNo]
  const text = qn?.markedAnswer
  const lastApiCallTime = timeStore((store) => store.lastApiCallTime)
  const testSeriesId = testStore((store) => store.testData?.testSeriesId)
  const isAnswerCorrect = qn?.isCorrect!

  const { mutate } = useUpdateTestMutation(testSeriesId!)

  function mutateTest() {
    mutate({
      resData: [
        {
          question: qn!.questionId!,
          action: 'answer-update',
          time: timeDiffFromNow(lastApiCallTime),
          marked: true,
          markedAnswer: qn!.markedAnswer,
          nextQuestion: allQn[qnNo + 1]?.questionId!,
        },
      ],
      testSeriesId: testSeriesId!,
    })
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const onChange = useCallback(
    (txt: string) => {
      if (mode === 'solution') return
      const question = allQn?.[qnNo]
      if (!question) return
      question.markedAnswer = txt
      setAllQn([...allQn])
      mutateTest()
    },
    [allQn, qnNo, setAllQn],
  )

  return (
    <View>
      <Label text={mode === 'test' ? 'Type your answer below' : 'Your answer'} />
      <Input
        placeholder={mode === 'test' ? 'Type your answer here' : 'You skipped this question'}
        keyboardType='numeric'
        value={text}
        onChangeText={onChange}
        editable={mode === 'test'}
        Left={<LeftIcon isAnswerCorrect={isAnswerCorrect} mode={mode} marked={qn?.markedAnswer!} />}
        style={textStyle(isAnswerCorrect, mode)}
      />
      {mode === 'test' && qn?.markedAnswer && (
        <TouchableOpacity className='mt-6' activeOpacity={0.6} onPress={() => onChange('')}>
          <Medium className='text text-sm underline'>Clear answer</Medium>
        </TouchableOpacity>
      )}
      {mode === 'solution' && (
        <Medium className='text-md mt-3 rounded-xl bg-green-500/15 px-5 py-3 pb-3.5 text-green-600 dark:text-green-500'>{`Correct answer is ${qn?.answer}`}</Medium>
      )}
    </View>
  )
})

const LeftIcon: React.FC<{ isAnswerCorrect: boolean; mode: mode; marked: string }> = ({
  isAnswerCorrect,
  mode,
  marked,
}) => {
  if (!marked) return null
  return mode === 'solution' ? (
    isAnswerCorrect ? (
      <DocumentValidationStrokeRoundedIcon color={colors.green[500]} height={20} width={20} />
    ) : (
      <MultiplicationSignIcon color={colors.red[500]} height={20} width={20} />
    )
  ) : null
}

function textStyle(isAnswerCorrect: boolean, mode: mode) {
  if (mode === 'solution') {
    return isAnswerCorrect ? { color: colors.green[500] } : { color: colors.red[500] }
  }
  return null
}

export default NumericalOptions
