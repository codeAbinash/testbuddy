import Press from '@components/Press'
import { AppBar } from '@components/TopBar'
import { RouteProp } from '@react-navigation/native'
import { Medium } from '@utils/fonts'
import type { StackNav } from '@utils/types'
import { FC } from 'react'
import { ScrollView, StatusBar, View } from 'react-native'

type ParamList = {
  PricingDetails: PricingDetailsParamList
}

export type PricingDetailsParamList = {}

type PricingDetailsProps = {
  route: RouteProp<ParamList, 'PricingDetails'>
  navigation: StackNav
}

const PricingDetails: FC<PricingDetailsProps> = ({ navigation, route }) => {
  return (
    <>
      <StatusBar barStyle='default' />
      <View className='flex-1 justify-between bg-white dark:bg-zinc-950'>
        <AppBar />
        <ScrollView className='p-5 pt-0'>
          <Medium className='text-center text-lg'>Pricing Details</Medium>
        </ScrollView>
      </View>
    </>
  )
}
export default PricingDetails
