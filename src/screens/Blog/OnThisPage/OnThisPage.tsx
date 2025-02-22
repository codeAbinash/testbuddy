import { StatusBar, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

import { PaddingBottom } from '@components/SafePadding'
import { AppBar } from '@components/TopBar'
import { RouteProp } from '@react-navigation/native'
import { Bold, Medium } from '@utils/fonts'
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
        <AppBar />
        <ScrollView contentContainerClassName='px-4 pb-4'>
          <Bold className='text mb-2.5 text-xl'>On This Page</Bold>
          <Medium className='text text-justify text-xs opacity-80' style={{ fontFamily: 'monospace' }}>
            {html}
          </Medium>
          <PaddingBottom />
        </ScrollView>
      </View>
    </>
  )
}

export default OnThisPage
