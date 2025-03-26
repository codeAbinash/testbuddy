import { FC, useEffect } from 'react'
import { FlatList, RefreshControl } from 'react-native'

import { useColorScheme } from 'nativewind'
import colors from 'tailwindcss/colors'

import { useRefreshByUser } from '@/hooks/useRefreshByUser'
import { SquareLock02Icon } from '@assets/icons/icons'
import { LoadingFullScreen } from '@components/Loading'
import NoData from '@components/NoData'
import { PaddingBottom } from '@components/SafePadding'
import api from '@query/api/api'
import { type RouteProp, useIsFocused } from '@react-navigation/native'
import BackHeader from '@screens/components/BackHeader'
import { useQuery } from '@tanstack/react-query'
import type { ColorScheme, StackNav } from '@utils/types'
import { Test } from './components/Test'

type ParamList = {
  TestList: TestListParamList
}

export type TestListParamList = {
  programId: string
}

type TestListProps = {
  route: RouteProp<ParamList, 'TestList'>
  navigation: StackNav
}

export type Test = Awaited<ReturnType<typeof api.testList>>[0]['tests'][0]

export default function TestList({ navigation, route }: TestListProps) {
  const isFocused = useIsFocused()
  const { programId } = route.params
  const { colorScheme } = useColorScheme()
  const { data, refetch, isLoading } = useQuery({
    queryFn: () => api.testList(programId),
    queryKey: ['testList', programId],
  })

  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch)

  useEffect(() => {
    if (isFocused) refetch()
  }, [isFocused, refetch])

  const details = data?.[0]
  const tests = data?.[0]?.tests

  return (
    <>
      <BackHeader
        title={details?.programTitle}
        navigation={navigation}
        Right={
          <RightLockIcon
            locked={details?.status === 'locked'}
            colorScheme={colorScheme}
            isLoading={isLoading}
            navigation={navigation}
            programId={programId}
          />
        }
      />
      <FlatList
        data={tests}
        keyExtractor={(item) => item.testId || ''}
        refreshControl={
          <RefreshControl
            refreshing={isRefetchingByUser}
            onRefresh={refetchByUser}
            style={{ zIndex: 1000 }}
            progressBackgroundColor={colorScheme === 'dark' ? colors.zinc[800] : 'white'}
            colors={colorScheme === 'dark' ? ['white'] : ['black']}
          />
        }
        renderItem={({ item, index }) => <Test scheme={colorScheme} test={item} index={index} programId={programId} />}
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

type RightIconParamList = {
  locked: boolean
  colorScheme: ColorScheme
  isLoading: boolean
  navigation: StackNav
  programId: string
}
const RightLockIcon: FC<RightIconParamList> = ({ locked, colorScheme, isLoading, navigation, programId }) => {
  if (isLoading || !locked) return null
  return (
    <SquareLock02Icon
      height={20}
      width={20}
      color={colorScheme === 'dark' ? colors.zinc[300] : colors.zinc[700]}
      onPress={() => {
        navigation.navigate('Premium', { programId })
      }}
    />
  )
}
