import { playStoreUrl, versionName } from '@/constants'
import Btn from '@components/Button'
import { PaddingBottom, PaddingTop } from '@components/SafePadding'
import type { checkForUpdatesT } from '@query/apis'
import type { RouteProp } from '@react-navigation/native'
import { W } from '@utils/dimensions'
import { Bold, Medium } from '@utils/fonts'
import type { StackNav } from '@utils/types'
import LottieView from 'lottie-react-native'
import { Linking, View } from 'react-native'

type ParamList = {
  Update: UpdateParamList
}

export type UpdateParamList = checkForUpdatesT

type UpdateProps = {
  route: RouteProp<ParamList, 'Update'>
  navigation: StackNav
}

export default function Update({ route, navigation }: UpdateProps) {
  const { critical, message, latestVersion, updateRequired, versionCode: vCode } = route.params
  return (
    <>
      <View className='flex-1 items-center justify-between bg-white px-6 dark:bg-black'>
        <PaddingTop />
        <LottieView
          source={require('../assets/animations/update.lottie')}
          style={{ height: W * 0.85, width: W * 0.85, marginLeft: 'auto', marginRight: 'auto' }}
          speed={0.7}
          autoPlay
          loop
          hardwareAccelerationAndroid
          cacheComposition
        />
        <View className='gap-5'>
          <Bold className='text text-center' style={{ fontSize: 25 }}>
            Update Available {latestVersion}
          </Bold>
          <Medium className='text mt-2 text-center opacity-70' style={{ fontSize: 13 }}>
            A new version of the application is available. Please update the application to the latest version to
            continue using the application.
          </Medium>
        </View>
        <View className='pb-2'>
          <Medium className='text pb-2 text-center text-xs opacity-80'>
            from v{versionName} to v{latestVersion}
          </Medium>
          <Btn title='Update Now' onPress={() => Linking.openURL(playStoreUrl)} />
          <PaddingBottom />
        </View>
      </View>
    </>
  )
}

{
  /* <Medium className='mt-2 text-center text-zinc-900 opacity-70 dark:text-zinc-100' style={{ fontSize: 13 }}>
  The installed version is {versionName}({versionCode}) and the latest version is {latestVersion}({vCode}).
  Please update the application.
</Medium> */
}
