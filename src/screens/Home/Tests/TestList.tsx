import { FC, useEffect } from 'react'
import { FlatList, RefreshControl, TouchableOpacity, View } from 'react-native'

import { useColorScheme } from 'nativewind'
import colors from 'tailwindcss/colors'

import { useRefreshByUser } from '@/hooks/useRefreshByUser'
import popupStore from '@/zustand/popupStore'
import { PlayIcon, SquareLock02Icon, SquareUnlock01Icon } from '@assets/icons/icons'
import { LoadingFullScreen } from '@components/Loading'
import NoData from '@components/NoData'
import { PaddingBottom } from '@components/SafePadding'
import api from '@query/api/api'
import { type RouteProp, useIsFocused, useNavigation } from '@react-navigation/native'
import BackHeader from '@screens/components/BackHeader'
import { useQuery } from '@tanstack/react-query'
import { Bold, Medium, SemiBold } from '@utils/fonts'
import type { ColorScheme, StackNav } from '@utils/types'

import { LeftBox } from './components/LeftBox'
import { SubjectBadgeList } from './components/SubjectBadgeList'

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

function calculatePercentage(completed: number, total: number) {
  if (completed === 0) return 0
  const percentage = (completed / total) * 100
  return percentage
}

type TestProps = {
  test: Test
  scheme: ColorScheme
  index: number
  programId: string
}

export function Test({ test, scheme, index, programId }: TestProps) {
  const timeCompleted = calculatePercentage(test.totalTimeCompleted, test.attemptTime)

  return (
    <>
      <View
        className='flex-row items-center justify-between gap-2 p-3 px-4'
        style={{
          borderWidth: timeCompleted === 0 ? 1 : 0,
          borderTopWidth: 0,
          borderLeftWidth: 0,
          borderRightWidth: 0,
          borderColor: scheme === 'dark' ? colors.zinc[900] : colors.zinc[100],
        }}
      >
        <View className='flex-shrink flex-row items-center gap-3'>
          <LeftBox test={test} index={index} />
          <View className='flex-shrink'>
            <SemiBold className='text text-xs' numberOfLines={1}>
              {test.testTitle}
            </SemiBold>
            <View className='flex-row items-center gap-1'>
              <Medium className='text text-xs opacity-70'>
                {test.qCount} Q | {secondToHour(test.attemptTime)} | FM: {test.maxMarks}
              </Medium>
              <SubjectBadgeList subjects={test.subjects} />
            </View>
            <Medium className='text text-xs opacity-60' style={{ fontSize: 9 }}>
              {test.syllabus}
            </Medium>
          </View>
        </View>
        <RightLockOrPlayIcon test={test} colorScheme={scheme} programId={programId} />
      </View>
      {timeCompleted === 0 ? null : (
        <View className='h-0.5 w-full bg-blue-500/30'>
          <View className='h-0.5 bg-blue-500' style={{ width: `${timeCompleted}%` }}></View>
        </View>
      )}
    </>
  )
}

function secondToHour(seconds: number) {
  const hours = Math.floor(seconds / 3600)
  return `${hours} hr`
}

type RightLockOrPlayIconProps = {
  test: Test
  colorScheme: ColorScheme
  programId: string
}
function RightLockOrPlayIcon({ test, colorScheme, programId }: RightLockOrPlayIconProps) {
  const alert = popupStore((state) => state.alert)
  const navigation = useNavigation<StackNav>()
  const locked = test.status === 'locked'
  function navigateToTest() {
    if (locked) return navigation.navigate('Premium', { programId: programId })
    alert('Are you sure?', 'Do you want to start the test?', [
      { text: 'Yes', onPress: () => navigation.navigate('Test', { testId: test.testId }) },
      { text: 'No', onPress: () => {} },
    ])
    console.log('navigating to test')
  }
  return (
    <TouchableOpacity
      className='flex-row items-center justify-center gap-1.5 rounded-lg border border-dashed border-zinc-500 p-1.5 px-2.5 pr-2'
      activeOpacity={0.6}
      onPress={navigateToTest}
    >
      <Bold className='text text-xs opacity-80' style={{ fontSize: 9 }}>
        {locked ? 'Unlock' : 'Start'}
      </Bold>
      {locked ? (
        <SquareUnlock01Icon
          height={15}
          width={15}
          color={colorScheme === 'dark' ? colors.zinc[400] : colors.zinc[700]}
        />
      ) : (
        <PlayIcon height={16} width={16} color={colorScheme === 'dark' ? colors.zinc[400] : colors.zinc[700]} />
      )}
    </TouchableOpacity>
  )
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
