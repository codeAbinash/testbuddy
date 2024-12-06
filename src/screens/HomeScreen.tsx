import api from '@/api'
import authStore from '@/zustand/authStore'
import popupStore from '@/zustand/popupStore'
import Btn from '@components/Button'
import Press from '@components/Press'
import { useQuery } from '@tanstack/react-query'
import { SemiBold } from '@utils/fonts'
import type { NavProp } from '@utils/types'
import { T_5_MIN } from '@utils/utils'
import React from 'react'
import { Image, StatusBar, View } from 'react-native'

export default function HomeScreen({ navigation }: NavProp) {
  const removeToken = authStore((store) => store.removeToken)
  const alert = popupStore((store) => store.alert)
  const { data } = useQuery({
    queryKey: ['profile'],
    queryFn: api.profile,
    staleTime: T_5_MIN,
  })

  function logout() {
    removeToken()
    navigation.reset({ index: 0, routes: [{ name: 'Login' }] })
  }

  function handlePress() {
    alert('Logout','Are you sure you want to logout?',  [{ text: 'Cancel' }, { text: 'Logout', onPress: logout }])
  }

  return (
    <>
      <StatusBar barStyle='dark-content' backgroundColor={'transparent'} />
      <View className='flex-1 items-center justify-center bg-zinc-50 px-5 dark:bg-black gap-5'>
        <View>
          <Image source={{ uri: data?.profilePic }} className='h-24 w-24 rounded-full bg-zinc-300 dark:bg-zinc-700' />
        </View>
        <Press>
          <SemiBold className='text-4xl text-zinc-800 active:text-lime-500 dark:text-white'>Testbuddy</SemiBold>
        </Press>
        <Btn onPress={handlePress}>Logout</Btn>
      </View>
    </>
  )
}
