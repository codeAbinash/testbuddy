import { useRefreshByUser } from '@/hooks/useRefreshByUser'
import { ArrowRight01StrokeStandardIcon } from '@assets/icons/icons'
import { PaddingBottom } from '@components/SafePadding'
import api, { type ProgramList } from '@query/api'
import TopArea from '@screens/components/TopArea'
import { useQuery } from '@tanstack/react-query'
import { Medium } from '@utils/fonts'
import type { ColorScheme, NavProps, StackNav, Stream } from '@utils/types'
import { useColorScheme } from 'nativewind'
import { useState } from 'react'
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

  return (
    <View>
      <TopArea navigation={navigation as any} />
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
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.7}
        // onPress={() => navigation.navigate('Programs', { test: t })}
        onPress={() => setIsExpanded((prev) => !prev)}
        className='h-100 flex-row items-center justify-between gap-6 p-5 py-3'
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
          height={24}
          width={24}
          color={scheme === 'dark' ? colors.zinc[500] : colors.zinc[500]}
          style={{
            transform: [{ rotate: isExpanded ? '90deg' : '0deg' }],
          }}
        />
      </TouchableOpacity>
      {isExpanded && (
        <FlatList
          data={t.programs}
          keyExtractor={(item) => item._id || ''}
          renderItem={({ item }) => (
            <Program navigation={navigation} program={item} scheme={scheme} image={t.logo || ''} />
          )}
          ListEmptyComponent={
            <View className='flex-1 items-center justify-center'>
              <Medium className='text text-lg'>No Programs Available</Medium>
            </View>
          }
          contentContainerStyle={{
            borderColor: scheme === 'dark' ? colors.zinc[900] : colors.zinc[100],
            borderTopWidth: 1,
            borderRightWidth: 0,
            borderLeftWidth: 0,
            borderBottomWidth: 0,
          }}
          contentContainerClassName=''
          ListFooterComponent={<PaddingBottom />}
        />
      )}
    </>
  )
}

type ProgramProps = {
  scheme: ColorScheme
  navigation: StackNav
  program: NonNullable<ProgramList['programs']>[0]
  image: string
}

function Program({ scheme, navigation, image, program }: ProgramProps) {
  const navigateToTest = () => {
    if (!program._id) return
    navigation.navigate('TestList', { programId: program._id || '' })
  }
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={navigateToTest}
      className='h-100 flex-row items-center justify-between gap-6 bg-zinc-50 px-5 py-3 pl-9 dark:bg-zinc-900'
      style={{
        borderWidth: 1,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderColor: scheme === 'dark' ? colors.zinc[800] : colors.zinc[200],
      }}
    >
      {/* <Image source={{ uri: image }} style={{ height: 30, width: 30 }} /> */}
      <View className='flex-1'>
        <Medium className='text text-sm'>{program?.title}</Medium>
      </View>
      <ArrowRight01StrokeStandardIcon
        height={22}
        width={22}
        color={scheme === 'dark' ? colors.zinc[500] : colors.zinc[500]}
      />
    </TouchableOpacity>
  )
}
