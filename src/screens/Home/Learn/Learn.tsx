import { FC, useState } from 'react'
import { StatusBar } from 'react-native'

import { useColorScheme } from 'nativewind'
import { FlatList, RefreshControl, ScrollView } from 'react-native-gesture-handler'
import colors from 'tailwindcss/colors'

import { useRefreshByUser } from '@/hooks/useRefreshByUser'
import { LoadingFullScreen } from '@components/Loading'
import api from '@query/api/api'
import TopArea from '@screens/components/TopArea'
import { useQuery } from '@tanstack/react-query'
import { NavProps } from '@utils/types'

import { chaptersList } from './api/chaptersList'
import Categories from './components/Categories'
import { SubjectSelector } from './components/SubjectSelector'

const Learn: FC<NavProps> = ({ navigation }) => {
  const { colorScheme } = useColorScheme()

  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: api.profile,
  })

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['chaptersList'],
    queryFn: () => chaptersList({ stream: user?.stream || 'engineering' }),
    enabled: !!user,
  })
  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch)

  const [selectedIndex, setSelectedIndex] = useState(0)

  if (isLoading) return <LoadingFullScreen text='Loading Chapters...' />

  return (
    <>
      <TopArea navigation={navigation as any} />
      <StatusBar barStyle='dark-content' backgroundColor={'transparent'} />
      <ScrollView
        className='bg-zinc-50 dark:bg-black'
        contentContainerClassName='pb-10'
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
        <FlatList
          horizontal
          data={data}
          keyExtractor={(item) => item._id}
          contentContainerClassName='px-5 gap-3.5 pt-5'
          renderItem={({ item, index }) => (
            <SubjectSelector
              item={item}
              index={index}
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
            />
          )}
        />
        <Categories categories={data?.[selectedIndex]?.categories} />
      </ScrollView>
    </>
  )
}
export default Learn
