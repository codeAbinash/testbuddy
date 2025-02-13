import { allColors } from '@utils/colors'
import { Medium } from '@utils/fonts'
import { useMemo } from 'react'
import { View } from 'react-native'

export type SubjectBadgeListProps = {
  subjects: string[]
}

function makeSubjectArray(subjects: string[]) {
  return subjects.length > 3
    ? subjects
        .slice(0, 3)
        .map((s) => s[0]?.toUpperCase())
        .concat('....')
    : subjects.map((s) => s[0]?.toUpperCase())
}

export function SubjectBadgeList({ subjects }: SubjectBadgeListProps) {
  const limitedSubjects = useMemo(() => makeSubjectArray(subjects), [subjects])

  return (
    <View className='ml-2 flex-row gap-1'>
      {limitedSubjects.map((subject, i) => (
        <View
          key={subject}
          className='p-1 px-2'
          style={{
            backgroundColor: allColors[i % allColors.length] + '33',
            height: 20,
            borderRadius: 5,
          }}
        >
          <Medium
            className='text-xs'
            style={{
              color: allColors[i % allColors.length],
              fontSize: 9,
            }}
          >
            {limitedSubjects[i]}
          </Medium>
        </View>
      ))}
    </View>
  )
}
