import { useRefreshByUser } from '@/hooks/useRefreshByUser'
import { ArrowRight01StrokeStandardIcon } from '@assets/icons/icons'
import { PaddingBottom } from '@components/SafePadding'
import api, { type ProgramList } from '@query/api'
import { useQuery } from '@tanstack/react-query'
import { Medium } from '@utils/fonts'
import type { ColorScheme, NavProps, StackNav, Stream } from '@utils/types'
import { useColorScheme } from 'nativewind'
import { useEffect } from 'react'
import { Image, TouchableOpacity, View } from 'react-native'
import { FlatList, RefreshControl } from 'react-native-gesture-handler'
import colors from 'tailwindcss/colors'

export default function Tests({ navigation }: NavProps) {
  const { colorScheme } = useColorScheme()
  const { data: profile } = useQuery({ queryKey: ['profile'], queryFn: api.profile })
  const { data, refetch, isLoading } = useQuery({
    queryKey: ['tests', profile, profile?.stream],
    queryFn: () => api.programList({ stream: (profile?.stream?.toLowerCase() as Stream) || 'engineering' }),
    enabled: !!profile,
  })

  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch)

  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <View>
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={isRefetchingByUser}
            onRefresh={refetchByUser}
            style={{ zIndex: 1000 }}
            progressBackgroundColor={colorScheme === 'dark' ? colors.zinc[800] : 'white'}
            colors={colorScheme === 'dark' ? ['white'] : ['black']}
          />
        }
        data={data}
        keyExtractor={(item, index) => (item.examName ? `${item.examName}-${index}` : `${index}`)}
        renderItem={({ item }) => <TestItem navigation={navigation} scheme={colorScheme} {...item} />}
        ListEmptyComponent={
          isLoading ? null : (
            <View className='flex-1 items-center justify-center'>
              <Medium className='text text-lg'>No Tests Available</Medium>
            </View>
          )
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
    </View>
  )
}

type TestProps = ProgramList & {
  scheme: ColorScheme
  navigation: StackNav
}

function TestItem({ scheme, navigation, ...t }: TestProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => navigation.navigate('Programs', { test: t })}
      className='h-100 flex-row items-center justify-between gap-5 p-5 py-3'
      style={{
        borderWidth: 1,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderColor: scheme === 'dark' ? colors.zinc[900] : colors.zinc[100],
      }}
    >
      <Image source={{ uri: t.logo }} style={{ height: 40, width: 40 }} />
      <View className='flex-1'>
        <Medium className='text text-sm'>{t.examTitle}</Medium>
        <Medium className='text text-xs opacity-80'>{t?.programs?.length ?? 0} Programs Available</Medium>
      </View>
      <ArrowRight01StrokeStandardIcon
        height={22}
        width={22}
        color={scheme === 'dark' ? colors.zinc[500] : colors.zinc[500]}
      />
    </TouchableOpacity>
  )
}
