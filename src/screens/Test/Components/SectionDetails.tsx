import { Clock01Icon } from '@assets/icons/icons'
import { Medium, SemiBold } from '@utils/fonts'
import { View } from 'react-native'
import colors from 'tailwindcss/colors'

export function SectionDetails({ qnNo, allQn }: { qnNo: number; allQn: any }) {
  return (
    <View className='flex-row items-center justify-between bg-white px-5 pb-2 dark:bg-zinc-950'>
      <Medium className='text text-sm capitalize'>
        Section {allQn[qnNo]?.section}: {allQn[qnNo]?.subject} | Attempted 5/90
      </Medium>
      <View className='flex-row items-center gap-1'>
        <Clock01Icon width={14} height={14} color={colors.zinc[500]} />
        <SemiBold className='text mb-1 gap-5 text-sm'>10:00:00</SemiBold>
      </View>
    </View>
  )
}
