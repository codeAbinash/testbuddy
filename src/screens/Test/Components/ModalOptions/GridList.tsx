import { GridViewIcon, ListViewIcon } from '@assets/icons/icons'
import modalStore, { ViewMode } from '@screens/Test/zustand/modalStore'
import { ColorScheme } from '@utils/types'
import { TouchableOpacity, View } from 'react-native'
import colors from 'tailwindcss/colors'

export default function GridList({ colorScheme }: { colorScheme: ColorScheme }) {
  const viewMode = modalStore((store) => store.viewMode)
  const setViewMode = modalStore((store) => store.setViewMode)
  return (
    <View className='w-full flex-row justify-center px-3 py-3'>
      <TouchableOpacity
        activeOpacity={0.7}
        className={`flex-1 items-center rounded-xl py-3 ${viewMode === ViewMode.Grid ? 'bg-zinc-100 dark:bg-black' : ''}`}
        onPress={() => setViewMode(ViewMode.Grid)}
      >
        <GridViewIcon width={20} height={20} color={colorScheme === 'dark' ? colors.zinc[300] : colors.zinc[700]} />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.7}
        className={`flex-1 items-center rounded-xl py-3 ${viewMode === ViewMode.List ? 'bg-zinc-100 dark:bg-black' : ''}`}
        onPress={() => setViewMode(ViewMode.List)}
      >
        <ListViewIcon width={20} height={20} color={colorScheme === 'dark' ? colors.zinc[300] : colors.zinc[700]} />
      </TouchableOpacity>
    </View>
  )
}
