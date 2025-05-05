import { useRefreshByUser } from '@/hooks/useRefreshByUser'
import { LoadingFullScreen } from '@components/Loading'
import { PaddingBottom } from '@components/SafePadding'
import api from '@query/api/api'
import { queryClient } from '@query/query'
import BackHeader from '@screens/components/BackHeader'
import { useQuery } from '@tanstack/react-query'
import { AwaitedReturn } from '@utils/types'
import { useColorScheme } from 'nativewind'
import { FC, useEffect, useState } from 'react'
import { FlatList, RefreshControl, ScrollView } from 'react-native'
import colors from 'tailwindcss/colors'
import { chaptersList } from '../api/chaptersList'
import LearnCategories from '../components/LearnCategories'
import { SubjectSelector } from '../components/SubjectSelector'
import FormulaCategories from '../components/FormulaCategories'

type FormulaBuddyProps = {}

const FormulaBuddy: FC<FormulaBuddyProps> = () => {
  const { colorScheme } = useColorScheme()
  const profile = queryClient.getQueryData(['user']) as AwaitedReturn<typeof api.profile>
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['chaptersList'],
    queryFn: () => chaptersList({ stream: profile?.stream || 'engineering' }),
    enabled: !!profile,
  })
  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch)
  
  const [selectedIndex, setSelectedIndex] = useState(0)
  
  useEffect(() => {
    console.log(data)
  }, [data])
  
  if (isLoading) return <LoadingFullScreen text='Loading Chapters...' />


  return (
    <>
      <BackHeader title='Formula Buddy' />
      <ScrollView
        className='bg-screen flex-1'
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
        <FormulaCategories categories={data?.[selectedIndex]?.categories} />
        <PaddingBottom />
      </ScrollView>
    </>
  )
}

export default FormulaBuddy
