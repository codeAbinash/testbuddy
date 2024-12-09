import api from '@query/apis'
import { useQuery } from '@tanstack/react-query'
import { Medium } from '@utils/fonts'
import type { NavProps } from '@utils/types'
import { useEffect } from 'react'
import { View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import BackHeader from './BackHeader'
import { Lottie } from '../components/Lottie'
import Animations from '@assets/animations/animations'

export default function Notifications({ navigation }: NavProps) {
  const { data, isPending, isError } = useQuery({
    queryKey: ['notificationsPage'],
    queryFn: api.notifications,
  })

  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <>
      <BackHeader title='Notifications' navigation={navigation} />
      <ScrollView contentContainerClassName='px-5 py-3 gap-5 screen-bg flex-1 ie'>
        <View className='m-auto'>
          <Lottie source={Animations.notifications} />
          <Medium className='text mb-52 mt-5 text-center opacity-70'>You have no notifications yet.</Medium>
        </View>
      </ScrollView>
    </>
  )
}
