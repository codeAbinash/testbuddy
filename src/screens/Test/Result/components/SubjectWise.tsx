import ColorIndicator from '@components/ColorIndicator'
import { Medium } from '@utils/fonts'
import { FC } from 'react'
import { StyleSheet, View } from 'react-native'
import colors from 'tailwindcss/colors'
import { Result } from '../types/result'

type SubjectWiseProps = {
  subjectWiseAnalysis?: Result['subjectWiseAnalysis']
}

const SubjectWise: FC<SubjectWiseProps> = ({ subjectWiseAnalysis }) => {
  const data = subjectWiseAnalysis || []

  const maxMarks = Math.max(
    ...data.map((item) => item.marks),
    ...data.map((item) => item.averageMarks),
    ...data.map((item) => item.toppersMarks),
  )
  const minMarks = Math.min(
    ...data.map((item) => item.marks),
    ...data.map((item) => item.averageMarks),
    ...data.map((item) => item.toppersMarks),
  )

  const maxHeight = 150
  const minHeight = 80
  return (
    <>
      <View className='flex-row gap-0.5'>
        <View className='flex-1 justify-center'>
          <View className='flex-row flex-1'>
            <View className='justify-center items-center -ml-2'>
              <Medium style={styles.chartLabel}>{maxMarks}</Medium>
              <View className='h-full w-[1] bg-zinc-500/50' style={{ height: maxHeight }}></View>
              <View className='h-full w-[1] bg-zinc-500/50' style={{ height: minHeight }}></View>
              <Medium style={styles.chartLabel}>{minMarks}</Medium>
            </View>
            <View className='flex-1'>
              <View className='flex-1 flex-row gap-4 justify-center items-end'>
                {data.map((item, i) => (
                  <MarksColumn
                    key={item._id || i}
                    max={maxMarks}
                    height={maxHeight}
                    self={item.marks > 0 ? item.marks : 0}
                    average={item.averageMarks > 0 ? item.averageMarks : 0}
                    topper={item.toppersMarks > 0 ? item.toppersMarks : 0}
                  />
                ))}
              </View>
              <View className='flex-1 flex-row gap-4 justify-center'>
                {data.map((item, i) => (
                  <MarksColumn
                    key={item._id || i}
                    max={minMarks}
                    height={minHeight}
                    self={item.marks < 0 ? item.marks : 0}
                    average={item.averageMarks < 0 ? item.averageMarks : 0}
                    topper={item.toppersMarks < 0 ? item.toppersMarks : 0}
                    isDown
                  />
                ))}
              </View>
            </View>
          </View>
          <View className='flex-1 flex-row gap-4 justify-between items-center mt-2'>
            {data.map((item, i) => (
              <Medium key={item._id || i} className='text-center flex-1 text-xs text opacity-80'>
                {item.subject}
              </Medium>
            ))}
          </View>
        </View>
      </View>
      <View className='mt-2 flex-row flex-wrap items-center justify-center gap-5'>
        <ColorIndicator text='Average Marks' color={colors.green[500]} />
        <ColorIndicator text='Topper Marks' color={colors.blue[500]} />
        <ColorIndicator text='Your Marks' color={colors.orange[500]} />
      </View>
    </>
  )
}

type MarksColumnProps = {
  self: number
  topper: number
  average: number
  isDown?: boolean
  height: number
  max: number
}
function MarksColumn({ self, topper, average, isDown, height, max }: MarksColumnProps) {
  const selfHeight = (self / max) * height
  const topperHeight = (topper / max) * height
  const averageHeight = (average / max) * height

  return (
    <View className={`flex-1 flex-row gap-0.5 justify-end ${isDown ? 'items-start' : 'items-end'}`} style={{ height }}>
      <View className={`flex-1 ${isDown ? 'flex-col' : 'flex-col-reverse'}`}>
        <View className='rounded-lg bg-green-500' style={{ height: averageHeight }} />
        {average !== 0 && (
          <Medium className='text' style={styles.chartLabel}>
            {average}
          </Medium>
        )}
      </View>
      <View className={`flex-1 ${isDown ? 'flex-col' : 'flex-col-reverse'}`}>
        <View className='rounded-lg bg-blue-500' style={{ height: topperHeight }} />
        {topper !== 0 && (
          <Medium className='text' style={styles.chartLabel}>
            {topper}
          </Medium>
        )}
      </View>
      <View className={`flex-1 ${isDown ? 'flex-col' : 'flex-col-reverse'}`}>
        <View className='rounded-lg bg-orange-500' style={{ height: selfHeight }} />
        {self !== 0 && (
          <Medium className='text' style={styles.chartLabel}>
            {self}
          </Medium>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  chartLabel: {
    fontSize: 9,
    textAlign: 'center',
    opacity: 0.8,
    paddingVertical: 1.5,
  },
})

export default SubjectWise
