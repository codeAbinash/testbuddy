import { useRefreshByUser } from '@/hooks/useRefreshByUser'
import Btn from '@components/Button'
import api from '@query/api/api'
import SocialIcons from '@screens/Home/HomeScreen/components/SocialIcons'
import TopArea from '@screens/components/TopArea'
import { useQuery } from '@tanstack/react-query'
import type { NavProps } from '@utils/types'
import { useColorScheme } from 'nativewind'
import { BackHandler, RefreshControl, ScrollView, StatusBar, View } from 'react-native'
import colors from 'tailwindcss/colors'
import CarouselElem from './components/CarouselElem'
import ContactSection from './components/ContactSection'
import { Counselling } from './components/Counselling'
import ExploreExams from './components/ExploreExams'
import ExploreTests from './components/ExploreTests'
import FormulaSection from './components/FormulaSection'
import ReferSection from './components/ReferSection'
import popupStore from '@/zustand/popupStore'
import { useIsFocused } from '@react-navigation/native'
import { useCallback, useEffect } from 'react'

export default function HomeScreen({ navigation }: NavProps) {
  const { colorScheme } = useColorScheme()
  const alert = popupStore((store) => store.alert)
  const isFocused = useIsFocused()

  const { refetch } = useQuery({ queryKey: ['homeScreen'], queryFn: api.homeScreen })
  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch)

  const onBackPress = useCallback(() => {
    if (!isFocused) return false
    alert('Exit test?', 'Do you want to exit the test?', [
      { text: 'Cancel' },
      { text: 'Exit', onPress: BackHandler.exitApp },
    ])
    return true
  }, [isFocused, alert])

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPress)
    return () => backHandler.remove()
  }, [onBackPress])

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
        <CarouselElem carousel={carousel} />
        <View className='p-5 gap-4'>
          <Btn onPress={() => navigation.navigate('Blogs')} title='Blogs'></Btn>
          <Btn
            onPress={() =>
              navigation.navigate('Test', {
                testId: '6621321123c322caf6992919',
              })
            }
            title='Test'
          ></Btn>
        </View>
        <ExploreExams />
        <ExploreTests navigation={navigation} />
        <ReferSection navigation={navigation} />
        <FormulaSection navigation={navigation} />
        <ContactSection navigation={navigation} />
        <Counselling navigation={navigation} />
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
