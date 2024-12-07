import api from '@/api'
import authStore from '@/zustand/authStore'
import { navigationStore } from '@/zustand/navigationStore'
import { useMutation } from '@tanstack/react-query'
import type { NavProps } from '@utils/types'
import React, { useEffect } from 'react'
import { View } from 'react-native'

export default function Splash({ navigation }: NavProps) {
  const { token } = authStore()
  const setNavigation = navigationStore((state) => state.setNavigation)
  const { mutate } = useMutation({
    mutationKey: ['checkForUpdate'],
    mutationFn: api.checkForUpdates,
    onSuccess: (data) => {
      if (data?.critical && data.updateRequired) {
        navigation.reset({ index: 0, routes: [{ name: 'Update', params: { data } }] })
      }
    },
  })

  useEffect(() => {
    mutate()
  }, [])

  useEffect(() => {
    setNavigation(navigation)
  }, [navigation, setNavigation])

  useEffect(() => {
    if (!token) navigation.replace('Login')
    else navigation.replace('HomeDrawer')
  }, [navigation, token])

  return <View className='flex-1 items-center justify-center'></View>
}
