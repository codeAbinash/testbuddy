import { StatusBar, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

import { PaddingBottom } from '@components/SafePadding'
import TopBar from '@components/TopBar'
import { RouteProp } from '@react-navigation/native'
import { SemiBold } from '@utils/fonts'
import { StackNav } from '@utils/types'

type ParamList = {
  OnThisPage: OnThisPageParamList
}

export type OnThisPageParamList = {
  html: string
}

type OnThisPageProps = {
  route: RouteProp<ParamList, 'OnThisPage'>
  navigation: StackNav
}

const OnThisPage: React.FC<OnThisPageProps> = ({ route }) => {
  const { html } = route.params
  return (
    <>
      <StatusBar barStyle='default' />
      <View className='flex-1'>
        <View className='pb-3.5'>
          <TopBar />
        </View>
        <ScrollView contentContainerClassName='px-4'>
          <SemiBold className='text mb-2.5 text-center text-base'>On This Page</SemiBold>
          <Text>{html}</Text>
          <PaddingBottom />
        </ScrollView>
      </View>
    </>
  )
}

export default OnThisPage
