import popupStore from '@/zustand/popupStore'
import { InformationCircleStrokeRoundedIcon } from '@assets/icons/icons'
import { Medium } from '@utils/fonts'
import { useColorScheme } from 'nativewind'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import Animated, { FadeIn } from 'react-native-reanimated'
import colors from 'tailwindcss/colors'
import { type Scorecard } from '../types/result'

export default function Scorecard({ score, i }: { score: Scorecard; i: number }) {
  const attempted = score.attempted || 0
  const total = score.totalQuestions || 0
  const correct = score.correct || 0
  const skipped = score.skipped || 0
  const wrong = total - correct - skipped
  const accuracyPercentage = (score.accuracyPercentage || 0).toFixed(2)
  const attemptedPercentage = (score.attemptedPercentage || 0).toFixed(2)
  const percentile = (score.percentile || 0).toFixed(2)

  const { colorScheme } = useColorScheme()
  const alert = popupStore((state) => state.alert)

  return (
    <Animated.View
      className='gap-3.5 rounded-3xl border border-zinc-100 bg-white p-5 dark:border-zinc-900 dark:bg-black'
      entering={FadeIn.duration(300).delay(i * 150)}
    >
      <View className='flex-row justify-between'>
        <Medium className='text capitalize'>{score.sectionName}</Medium>
        <TouchableOpacity
          onPress={() => {
            const name = score.sectionName || ''
            const sectionName = name.charAt(0).toUpperCase() + name.slice(1)
            alert(
              sectionName || '',
              `Accuracy: ${accuracyPercentage}%\nAttempted: ${attemptedPercentage}%\nPercentile: ${percentile}%`,
            )
          }}
        >
          <InformationCircleStrokeRoundedIcon
            height={20}
            width={20}
            color={colorScheme === 'dark' ? colors.zinc[500] : colors.zinc[500]}
          />
        </TouchableOpacity>
      </View>
      <View className='h-6 w-full flex-row overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-900'>
        <View className='h-6 bg-green-500' style={{ width: `${(correct / total) * 100}%` }}></View>
        <View className='h-6 bg-rose-500' style={{ width: `${(wrong / total) * 100}%` }}></View>
      </View>
      <View>
        <Medium className='text text-xs opacity-70'>
          {attempted} attempted, {correct} correct, {skipped} skipped, {wrong} wrong out of {total}
        </Medium>
      </View>
    </Animated.View>
  )
}

export const ScoreboardTable = React.memo<{ board: Scorecard[] }>(({ board }) => {
  return (
    <View
      className='mt-5'
      style={{
        borderWidth: 0.7,
        borderRightWidth: 0,
        borderColor: colors.zinc[500],
      }}
    >
      <View className='flex-row items-center justify-between'>
        <Cell name='Section' />
        {board.map((score, i) => (
          <Cell key={i} name={score.sectionName || ''} />
        ))}
      </View>
      <View className=''>
        {rows.map((row, i) => (
          <View
            className='flex-row items-center justify-between'
            key={i}
            style={[
              {
                borderTopWidth: 0.7,
                borderColor: colors.zinc[500],
              },
            ]}
          >
            <Cell name={row.name} />
            {board.map((score, j) => (
              <Cell name={score[row.key as keyof Scorecard] || 0} key={j} prefix={row.prefix} />
            ))}
          </View>
        ))}
      </View>
    </View>
  )
})

function Cell({ name, prefix }: { name: string | number; prefix?: string }) {
  const twoDigits = (num: number) => (num % 1 === 0 ? num.toString() : num.toFixed(2).replace(/\.?0+$/, ''))
  return (
    <View
      className='flex-1 py-2.5'
      style={{
        borderRightWidth: 0.7,
        borderColor: colors.zinc[500],
      }}
    >
      <Medium className='text text-center text-xs capitalize'>
        {typeof name === 'number' ? twoDigits(name) : name}
        {prefix}
      </Medium>
    </View>
  )
}

type Row = {
  name: string
  key: string
  prefix?: string
}
const rows: Row[] = [
  { name: 'Total Questions', key: 'totalQuestions' },
  { name: 'Correct', key: 'correct' },
  { name: 'Incorrect', key: 'incorrect' },
  { name: 'Attempted', key: 'attempted' },
  { name: 'Skipped', key: 'skipped' },
  { name: 'Accuracy %', key: 'accuracyPercentage', prefix: '%' },
  { name: 'Attempted %', key: 'attemptedPercentage', prefix: '%' },
  { name: 'Percentile', key: 'percentile' },
]
