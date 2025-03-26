import { useRefreshByUser } from '@/hooks/useRefreshByUser'
import { LoadingFullScreen } from '@components/Loading'
import NoData from '@components/NoData'
import { PaddingBottom } from '@components/SafePadding'
import api from '@query/api/api'
import BackHeader from '@screens/components/BackHeader'
import { useQuery } from '@tanstack/react-query'
import { useColorScheme } from 'nativewind'
import { FC } from 'react'
import { FlatList } from 'react-native'
import { RefreshControl } from 'react-native-gesture-handler'
import colors from 'tailwindcss/colors'
import { attemptedTestsList } from './api/attemptedTests'
import { Test } from './components/Test'

export type Test = Awaited<ReturnType<typeof api.testList>>[0]['tests'][0]

export default function AttemptedTests() {
  const { colorScheme } = useColorScheme()
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['completedTests'],
    queryFn: attemptedTestsList,
  })

  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch)

  return (
    <>
      {isLoading ? <LoadingFullScreen text={'Loading Attempted Tests'} /> : null}
      <BackHeader title='Attempted Tests' />
      <FlatList
        data={data}
        keyExtractor={(item) => item._id || ''}
        refreshControl={
          <RefreshControl
            refreshing={isRefetchingByUser}
            onRefresh={refetchByUser}
            style={{ zIndex: 1000 }}
            progressBackgroundColor={colorScheme === 'dark' ? colors.zinc[800] : 'white'}
            colors={colorScheme === 'dark' ? ['white'] : ['black']}
          />
        }
        renderItem={({ item, index }) => <Test scheme={colorScheme} test={item.test} index={index} />}
        ListEmptyComponent={<EmptyList isLoading={isLoading} data={data} />}
        contentContainerStyle={{
          borderColor: colorScheme === 'dark' ? colors.zinc[900] : colors.zinc[100],
          borderTopWidth: 1,
          borderRightWidth: 0,
          borderLeftWidth: 0,
          borderBottomWidth: 0,
        }}
        contentContainerClassName=''
        ListFooterComponent={<PaddingBottom />}
      />
    </>
  )
}

type EmptyListProps = {
  isLoading: boolean
  data?: any[]
}
const EmptyList: FC<EmptyListProps> = ({ isLoading, data }) => {
  return !data || isLoading ? <LoadingFullScreen text='Loading Tests...' /> : <NoData text='No tests available' />
}
