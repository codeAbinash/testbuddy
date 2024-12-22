import { GridViewIcon, ListViewIcon } from '@assets/icons/icons'
import { ColorScheme } from '@utils/types'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import colors from 'tailwindcss/colors'

export default function GridList({ colorScheme }: { colorScheme: ColorScheme }) {
  const [view, setView] = React.useState<'grid' | 'list'>('grid')
  return (
    <View className='w-full flex-row justify-center px-3 py-3'>
      <TouchableOpacity
        activeOpacity={0.7}
        className={`flex-1 items-center rounded-xl py-3 ${view === 'grid' ? 'bg-zinc-100 dark:bg-black' : ''}`}
        onPress={() => setView('grid')}
      >
        <GridViewIcon width={20} height={20} color={colorScheme === 'dark' ? colors.zinc[300] : colors.zinc[700]} />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.7}
        className={`flex-1 items-center rounded-xl py-3 ${view === 'list' ? 'bg-zinc-100 dark:bg-black' : ''}`}
        onPress={() => setView('list')}
      >
        <ListViewIcon width={20} height={20} color={colorScheme === 'dark' ? colors.zinc[300] : colors.zinc[700]} />
      </TouchableOpacity>
    </View>
  )
}
