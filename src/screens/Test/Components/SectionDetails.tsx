import { Clock01Icon } from '@assets/icons/icons'
import { Medium, SemiBold } from '@utils/fonts'
import { ColorScheme } from '@utils/types'
import { View } from 'react-native'
import colors from 'tailwindcss/colors'

export function SectionDetails({ qnNo, allQn, colorScheme }: { qnNo: number; allQn: any; colorScheme: ColorScheme }) {
  return (
    <View className='flex-row items-center justify-between bg-white px-5 pt-1 dark:bg-zinc-950'>
      <Medium className='text text-sm capitalize' style={{ fontSize: 12 }}>
        Section {allQn[qnNo]?.section}: {allQn[qnNo]?.subject} | Attempted 5/90
      </Medium>
      <View className='flex-row items-center gap-1 opacity-80'>
        <Clock01Icon width={13} height={13} color={colorScheme === 'dark' ? colors.zinc[200] : colors.zinc[800]} />
        <SemiBold className='text mb-1 gap-5 text-sm' style={{ fontSize: 12, fontVariant: ['tabular-nums'] }}>
          0h 14m 36s
        </SemiBold>
      </View>
    </View>
  )
}
