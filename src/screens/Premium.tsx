import Btn from '@components/Button'
import { AppBar } from '@components/TopBar'
import { premiumInformation } from '@query/api/index'
import { RouteProp } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query'
import { Bold, SemiBold } from '@utils/fonts'
import type { StackNav } from '@utils/types'
import { FC } from 'react'
import { StatusBar, ToastAndroid, View } from 'react-native'

type ParamList = {
  Premium: PremiumParamList
}

export type PremiumParamList = {
  programId: string
}

type PremiumProps = {
  route: RouteProp<ParamList, 'Premium'>
  navigation: StackNav
}

const Premium: FC<PremiumProps> = ({ navigation, route }) => {
  const { programId } = route.params
  const { data } = useQuery({
    queryKey: ['premium', programId],
    queryFn: () => premiumInformation(programId),
  })

  console.log(data)

  return (
    <>
      <StatusBar barStyle='default' />
      <View className='flex-1 justify-between bg-white dark:bg-zinc-950'>
        <AppBar />
        <View className='items-center justify-center gap-5 px-8'>
          <Bold className='text text-center' style={{ fontSize: 20 }}>
            Upgrade to Premium
          </Bold>
          <SemiBold className='text text-center text-sm opacity-80'>
            Upgrade to premium to get access to all the features and unlock the full potential of the app.
          </SemiBold>
        </View>
        <View className='p-5 pb-10'>
          <Btn
            title='Upgrade to Premium'
            onPress={() => {
              ToastAndroid.show('This feature is under development and will be available soon', ToastAndroid.SHORT)
              navigation.goBack()
            }}
          />
        </View>
      </View>
    </>
  )
}

export default Premium
