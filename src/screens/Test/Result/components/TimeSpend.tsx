import ColorIndicator from '@components/ColorIndicator'
import { secToHrMinSec } from '@utils/utils'
import { View } from 'react-native'
import colors from 'tailwindcss/colors'
import { TimeSpentAnalysis } from '../types/result'

export default function TimeSpend({ timeSpentAnalysis }: { timeSpentAnalysis?: TimeSpentAnalysis }) {
  const correct = timeSpentAnalysis?.totalTimeSpentOnCorrect || 0
  const incorrect = timeSpentAnalysis?.totalTimeSpentOnIncorrect || 0
  const unattempted = timeSpentAnalysis?.totalTimeSpentOnUnattempted || 0
  const total = correct + incorrect + unattempted

  return (
    <View>
      <View className='h-6 w-full flex-row overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-900'>
        <View className='h-full bg-green-500' style={{ width: `${(correct / total) * 100}%` }}></View>
        <View className='h-full bg-rose-500' style={{ width: `${(incorrect / total) * 100}%` }}></View>
        <View className='h-full bg-yellow-500' style={{ width: `${(unattempted / total) * 100}%` }}></View>
      </View>
      <View className='mt-5 flex-row flex-wrap items-center gap-x-3 gap-y-1.5'>
        <ColorIndicator text={'Time spent on correct answers ' + secToHrMinSec(correct)} color={colors.green['500']} />
        <ColorIndicator
          text={'Time spent on incorrect answers ' + secToHrMinSec(incorrect)}
          color={colors.rose['500']}
        />
        <ColorIndicator
          text={'Time spent on unattempted questions ' + secToHrMinSec(unattempted)}
          color={colors.yellow['500']}
        />
      </View>
    </View>
  )
}
