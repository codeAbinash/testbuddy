import { W } from '@utils/dimensions'
import { Medium } from '@utils/fonts'
import React from 'react'
import { View } from 'react-native'
import colors from 'tailwindcss/colors'
import { DifficultyAnalysis } from '../types/result'

const GRAPH_WIDTH = W - 40
const GAP = 3
export const incorrect = colors.rose['500']
export const correct = colors.green['500']
export const skip = colors.zinc['500'] + '30'

type allQns = NonNullable<NonNullable<NonNullable<DifficultyAnalysis['levels']>[0]['questions']>[0]>['status']

export function allQuestions(diff: DifficultyAnalysis) {
  const allQns: allQns[] = []
  for (const level of diff.levels || []) {
    for (const qn of level.questions || []) {
      allQns.push(qn.status)
    }
  }
  return allQns
}

export const Attempt = React.memo<{ diff: DifficultyAnalysis }>(({ diff }) => {
  const allQns = allQuestions(diff)
  return (
    <View>
      <Medium className='text text-md capitalize'>{diff.subject}</Medium>
      <View style={{ width: GRAPH_WIDTH, gap: GAP }} className='mx-auto mt-2.5 flex-row'>
        {allQns.map((qn, i) => (
          <View
            key={i}
            style={{
              width: (GRAPH_WIDTH - GAP * (allQns.length - 1)) / allQns.length,
              height: 60,
              borderRadius: 3,
              backgroundColor: qn === 'correct' ? correct : qn === 'incorrect' ? incorrect : skip,
            }}
          />
        ))}
      </View>
    </View>
  )
})
