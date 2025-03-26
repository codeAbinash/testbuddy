import type { ColorScheme } from '@utils/types'
import { SemiBold, Medium } from '@utils/fonts'
import { layout, layout100 } from '@utils/utils'
import { useState } from 'react'
import { View, TouchableOpacity } from 'react-native'
import colors from 'tailwindcss/colors'
import { LeftBox } from './LeftBox'
import RightLockOrPlayIcon from './RightSideLockIcon'
import { SubjectBadgeList } from './SubjectBadgeList'
import { type Test } from '../TestList'
import Animated from 'react-native-reanimated'

type TestProps = {
  test: Test
  scheme: ColorScheme
  index: number
  programId?: string
}
const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity)

export function Test({ test, scheme, index, programId }: TestProps) {
  const timeCompleted = calculatePercentage(test.totalTimeCompleted, test.attemptTime)
  const [expanded, setExpanded] = useState(false)

  return (
    <>
      <AnimatedTouchableOpacity
        className='flex-row items-center justify-between gap-2 p-3 px-4'
        style={{
          borderBottomWidth: timeCompleted === 0 ? 1 : 0,
          borderColor: scheme === 'dark' ? colors.zinc[900] : colors.zinc[100],
        }}
        onPress={() => setExpanded((prev) => !prev)}
        activeOpacity={0.7}
        layout={layout}
      >
        <View className='flex-shrink flex-row items-center gap-3'>
          <LeftBox test={test} index={index} />
          <Animated.View className='flex-shrink' layout={layout}>
            <SemiBold className='text text-xs' numberOfLines={1}>
              {test.testTitle}
            </SemiBold>
            {expanded && (
              <Animated.View className='flex-row items-center gap-1'>
                <Medium className='text text-xs opacity-70'>
                  {test.qCount} Q | {secondToHour(test.attemptTime)} | FM: {test.maxMarks}
                </Medium>
                <SubjectBadgeList subjects={test.subjects} />
              </Animated.View>
            )}
            <Animated.View layout={layout100}>
              <Medium className='text text-xs opacity-60' style={{ fontSize: 9 }}>
                {test.syllabus}
              </Medium>
            </Animated.View>
          </Animated.View>
        </View>
        <Animated.View layout={layout}>
          {test.status === 'inactive' ? (
            <Medium className='text' style={{ fontSize: 9.5 }}>
              Will live soon
            </Medium>
          ) : (
            <RightLockOrPlayIcon test={test} colorScheme={scheme} programId={programId} />
          )}
        </Animated.View>
      </AnimatedTouchableOpacity>
      {timeCompleted === 0 ? null : (
        <View className='h-0.5 w-full bg-blue-500/30'>
          <View className='h-0.5 bg-blue-500' style={{ width: `${timeCompleted}%` }}></View>
        </View>
      )}
    </>
  )
}

function secondToHour(seconds: number) {
  const hours = Math.floor(seconds / 3600)
  return `${hours} hr`
}

function calculatePercentage(completed: number, total: number) {
  if (completed === 0) return 0
  const percentage = (completed / total) * 100
  return percentage
}
