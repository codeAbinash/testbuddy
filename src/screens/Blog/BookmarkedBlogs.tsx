import { FC, useEffect } from 'react'
import { TouchableOpacity, View } from 'react-native'

import { useColorScheme } from 'nativewind'
import { FlatList, RefreshControl } from 'react-native-gesture-handler'
import colors from 'tailwindcss/colors'

import { useRefreshByUser } from '@/hooks/useRefreshByUser'
import { ArrowRight01StrokeRoundedIcon } from '@assets/icons/icons'
import LoadingOrEmptyFlatList from '@components/LoadingOrEmptyFlatList'
import { PaddingBottom } from '@components/SafePadding'
import { useRefetchOnFocus } from '@query/query'
import BackHeader from '@screens/components/BackHeader'
import { useQuery } from '@tanstack/react-query'
import { Medium, SemiBold } from '@utils/fonts'
import { NavProps } from '@utils/types'
import { bookmarkedBlogs } from './api/bookmarkedBlogs'

const BookmarkedBlogs: FC<NavProps> = ({ navigation }) => {
  const { colorScheme } = useColorScheme()
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['bookmarkedBlogs'],
    queryFn: bookmarkedBlogs,
  })

  useRefetchOnFocus(refetch)

  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch)

  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <>
      <BackHeader title='Bookmarked Blogs' />
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
        renderItem={({ item }) => (
          <TouchableOpacity
            key={item._id}
            className='px-5 pt-4 gap-0.5 py-3 flex-row items-center justify-between'
            style={{
              borderBottomWidth: 1,
              borderColor: colorScheme === 'dark' ? colors.zinc[900] : colors.zinc[100],
            }}
            activeOpacity={0.8}
            onPress={() => {
              navigation.navigate('Blog', { id: item._id })
            }}
          >
            <View>
              <SemiBold className='text text-sm'>{item.title}</SemiBold>
              <Medium className='text text-sm opacity-80'>
                {item.chapter}{' '}
                <Medium className='text text-xs opacity-50'>{item.tags.map((tag) => '#' + tag).join(' ')}</Medium>
              </Medium>
            </View>
            <ArrowRight01StrokeRoundedIcon
              color={colorScheme === 'dark' ? colors.zinc[300] : colors.zinc[700]}
              width={25}
              height={25}
            />
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <LoadingOrEmptyFlatList
            isLoading={isLoading}
            data={data}
            emptyText='No Bookmarked Blogs'
            loadingText='Loading Bookmarked Blogs...'
          />
        }
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

export default BookmarkedBlogs
