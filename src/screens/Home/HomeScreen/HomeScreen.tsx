import { useRefreshByUser } from '@/hooks/useRefreshByUser'
import api from '@query/api'
import SocialIcons from '@screens/Home/HomeScreen/components/SocialIcons'
import { useQuery } from '@tanstack/react-query'
import type { NavProps } from '@utils/types'
import { useColorScheme } from 'nativewind'
import { RefreshControl, ScrollView, StatusBar } from 'react-native'
import colors from 'tailwindcss/colors'
import CarouselElem from './components/CarouselElem'
import ContactSection from './components/ContactSection'
import ExploreExams from './components/ExploreExams'
import ExploreTests from './components/ExploreTests'
import FormulaSection from './components/FormulaSection'
import ReferSection from './components/ReferSection'

export default function HomeScreen({ navigation }: NavProps) {
  const { colorScheme } = useColorScheme()
  const { data, refetch } = useQuery({ queryKey: ['homeScreen'], queryFn: api.homeScreen })
  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch)

  return (
    <>
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
        <CarouselElem carousel={carousel} />
        <ExploreExams />
        <ExploreTests navigation={navigation} />
        <ReferSection navigation={navigation} />
        <FormulaSection navigation={navigation} />
        <ContactSection navigation={navigation} />
        <SocialIcons />
      </ScrollView>
    </>
  )
}

/* <View className='gap-5 p-5'>
  <Btn title='Start Test' onPress={() => navigation.navigate('Test', { testId: '66bbd61cc58453d49f06c7db' })} />
  <Btn
    title='View Result'
    onPress={() => navigation.navigate('Solution', { testId: '66bbd61cc58453d49f06c7db' })}
  />
  <Medium className='text-xs'>{JSON.stringify(data, null, 2)}</Medium>
</View> */

const carousel = [
  { imgSrc: 'https://picsum.photos/800' },

  { imgSrc: 'https://picsum.photos/802' },

  { imgSrc: 'https://picsum.photos/803' },

  { imgSrc: 'https://picsum.photos/804' },

  { imgSrc: 'https://picsum.photos/806' },
]
