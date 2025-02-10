import { useRefreshByUser } from '@/hooks/useRefreshByUser'
import api from '@query/api'
import { useQuery } from '@tanstack/react-query'
import { Medium } from '@utils/fonts'
import { useColorScheme } from 'nativewind'
import { ScrollView } from 'react-native'
import { RefreshControl } from 'react-native-gesture-handler'
import colors from 'tailwindcss/colors'

export default function Tests() {
  const { data, refetch } = useQuery({ queryKey: ['tests'], queryFn: api.testList })
  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch)
  const { colorScheme } = useColorScheme()

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={isRefetchingByUser}
          onRefresh={refetchByUser}
          style={{ zIndex: 1000 }}
          progressBackgroundColor={colorScheme === 'dark' ? colors.zinc[800] : 'white'}
          colors={colorScheme === 'dark' ? ['white'] : ['black']}
        />
      }
    >
      <Medium className='text'>Tests</Medium>
      <Medium className='text text-xs'>{JSON.stringify(data, null, 2)}</Medium>
    </ScrollView>
  )
}
