import Animations from '@assets/animations/animations'
import Btn from '@components/Button'
import { Lottie } from '@components/Lottie'
import TopBar from '@components/TopBar'
import { W } from '@utils/dimensions'
import { Bold, SemiBold } from '@utils/fonts'
import type { NavProps } from '@utils/types'
import { StatusBar, ToastAndroid, View } from 'react-native'

const Premium = ({ navigation }: NavProps) => {
  return (
    <>
      <StatusBar barStyle='default' />
      <View className='flex-1 justify-between bg-white dark:bg-zinc-950'>
        <View>
          <TopBar />
        </View>
        <Lottie source={Animations.premium} style={{ width: W * 0.8, height: W * 0.8 }} />
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
