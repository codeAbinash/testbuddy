import ColorIndicator from '@components/ColorIndicator'
import { W } from '@utils/dimensions'
import { Medium } from '@utils/fonts'
import React from 'react'
import { View } from 'react-native'
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

export function DifficultyColors() {
  return (
    <View className='mt-2 flex-row flex-wrap items-center justify-center gap-10'>
      <ColorIndicator text='Easy' color={easy} />
      <ColorIndicator text='Medium' color={mid} />
      <ColorIndicator text='Hard' color={hard} />
    </View>
  )
}
