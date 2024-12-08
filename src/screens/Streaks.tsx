import type { NavProps } from '@utils/types'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import BackHeader from './BackHeader'

export default function Streaks({ navigation }: NavProps) {
  return (
    <>
      <BackHeader title='Streaks' navigation={navigation} />
      <ScrollView contentContainerClassName='px-5 py-3 gap-5 flex-1 screen-bg'></ScrollView>
    </>
  )
}
