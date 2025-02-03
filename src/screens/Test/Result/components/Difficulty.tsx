import ColorIndicator from '@components/ColorIndicator'
import { useNavigation } from '@react-navigation/native'
import currentQnStore from '@screens/Test/zustand/currentQn'
import { W } from '@utils/dimensions'
import { Medium } from '@utils/fonts'
import { StackNav } from '@utils/types'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import colors from 'tailwindcss/colors'
import { DifficultyAnalysis } from '../types/result'

export type allQns = NonNullable<NonNullable<NonNullable<DifficultyAnalysis['levels']>[0]['questions']>[0]> & {
  difficulty?: 'easy' | 'medium' | 'hard'
}

function randomLevel() {
  return Math.random() > 0.5 ? 'easy' : Math.random() > 0.5 ? 'medium' : 'hard'
}

export function allQuestions(diff: DifficultyAnalysis) {
  const allQns: allQns[] = []
  for (const level of diff.levels || []) {
    for (const qn of level.questions || []) {
      allQns.push({
        qNumber: qn.qNumber,
        status: qn.status,
        questionId: qn.questionId,
        difficulty: __DEV__ ? randomLevel() : level.level,
      })
    }
  }
  return allQns
}

export const GRAPH_WIDTH = W - 40
export const GAP = 3
const easy = colors.violet['500'] + '33'
const mid = colors.violet['500'] + '99'
const hard = colors.violet['500']

const Difficulty = React.memo<{ diff: DifficultyAnalysis }>(({ diff }) => {
  const allQns = allQuestions(diff)
  return (
    <View>
      <Medium className='text text-md capitalize'>{diff.subject}</Medium>
      <View style={{ width: GRAPH_WIDTH, gap: GAP }} className='mx-auto mt-2.5 flex-row'>
        {allQns.map((qn) => (
          <View
            key={qn.questionId}
            style={{
              width: (GRAPH_WIDTH - GAP * (allQns.length - 1)) / allQns.length,
              height: 60,
              borderRadius: 3,
              backgroundColor: qn.difficulty === 'easy' ? easy : qn.difficulty === 'medium' ? mid : hard,
            }}
          />
        ))}
      </View>
    </View>
  )
})

export default Difficulty

const statusColors = {
  correct: colors.green['500'],
  incorrect: colors.red['500'],
  skipped: colors.zinc['500'] + '30',
}

export const DifficultyV2 = React.memo<{ diff: DifficultyAnalysis }>(({ diff }) => {
  const setQnNo = currentQnStore((state) => state.setQnNo)
  const navigation = useNavigation<StackNav>()

  return (
    <View>
      <Medium className='text text-md capitalize'>{diff.subject}</Medium>
      <View className='mx-auto gap-2 mt-2.5 flex-row'>
        <View>
          {diff.levels?.map((level) => (
            <View key={level.level} className='w-full flex-row justify-between border border-b-0 border-zinc-500/50'>
              <View className='flex w-1/6 items-center justify-center border border-b-0 border-l-0 border-t-0 border-zinc-500/50 p-2'>
                <Medium className='text text-xs capitalize'>{level.level}</Medium>
              </View>
              <View className='flex-1 flex-row flex-wrap items-center justify-center gap-1.5 p-2'>
                {level.questions?.map((qn) => (
                  <TouchableOpacity
                    onPress={() => {
                      setQnNo((qn.qNumber ?? 1) - 1)
                      navigation.goBack()
                    }}
                    key={qn.questionId}
                    className='flex items-center justify-center rounded-lg'
                    style={{
                      height: 30,
                      width: 30,
                      backgroundColor: statusColors[qn?.status ?? 'skipped'],
                    }}
                  >
                    <Medium
                      className='pt-0.5 text-xs text-white'
                      style={{
                        color: qn?.status === 'skipped' ? colors.zinc['500'] : colors.white,
                      }}
                    >
                      {qn.qNumber}
                    </Medium>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}
          <View className='w-full border border-t-0 border-zinc-500/50'></View>
        </View>
      </View>
    </View>
  )
})

export function AttemptColors() {
  return (
    <View className='mt-2 flex-row flex-wrap items-center justify-center gap-10'>
      <ColorIndicator text='Correct' color={statusColors.correct} />
      <ColorIndicator text='Incorrect' color={statusColors.incorrect} />
      <ColorIndicator text='Not Attempted' color={statusColors.skipped} />
    </View>
  )
}

export function DifficultyColors() {
  return (
    <View className='mt-2 flex-row flex-wrap items-center justify-center gap-10'>
      <ColorIndicator text='Easy' color={easy} />
      <ColorIndicator text='Medium' color={mid} />
      <ColorIndicator text='Hard' color={hard} />
    </View>
  )
}
