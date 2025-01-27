import Btn from '@components/Button'
import { Lottie } from '@components/Lottie'
import { W } from '@utils/dimensions'
import { Medium } from '@utils/fonts'
import type { NavProps } from '@utils/types'
import { ScrollView, StatusBar, View } from 'react-native'

export default function HomeScreen({ navigation }: NavProps) {
  // const { colorScheme } = useColorScheme()
  // const { data, refetch } = useQuery({
  //   queryKey: ['homeScreen'],
  //   queryFn: api.homeScreen,
  // })
  // const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch)

  return (
    <>
      <StatusBar barStyle='dark-content' backgroundColor={'transparent'} />
      <ScrollView
        className='bg-zinc-50 dark:bg-black'
        contentContainerClassName=''
        // refreshControl={
        //   <RefreshControl
        //     refreshing={isRefetchingByUser}
        //     onRefresh={refetchByUser}
        //     style={{ zIndex: 1000 }}
        //     progressBackgroundColor={colorScheme === 'dark' ? colors.zinc[800] : 'white'}
        //     colors={colorScheme === 'dark' ? ['white'] : ['black']}
        //   />
        // }
      >
        <Lottie source={require('../assets/animations/lottie/test.lottie')} style={{ width: W, height: W * 0.9 }} />
        <View className='gap-5 p-5'>
          <Medium className='text px-5 text-center text-xs'>
            Welcome to the Test App! This is a test Test for testing purposes.
          </Medium>
          <Btn title='Start Test' onPress={() => navigation.navigate('Test', { testId: '66bbd61cc58453d49f06c7db' })} />
          <Btn
            title='View Result'
            onPress={() => navigation.navigate('Result', { testId: '66bbd61cc58453d49f06c7db' })}
          />
        </View>
        {/* <Medium className='text text-xs'>{JSON.stringify(data, null, 2)}</Medium> */}
      </ScrollView>
    </>
  )
}
