import { playStoreUrl, versionName } from '@/constants'
import Animations from '@assets/animations/animations'
import Btn from '@components/Button'
import { Lottie } from '@components/Lottie'
import { PaddingBottom, PaddingTop } from '@components/SafePadding'
import { checkForUpdatesT } from '@query/api/api'
import type { RouteProp } from '@react-navigation/native'
import { W } from '@utils/dimensions'
import { Bold, Medium } from '@utils/fonts'
import type { StackNav } from '@utils/types'
import { Linking, View } from 'react-native'

type ParamList = {
  Update: UpdateParamList
}

export type UpdateParamList = checkForUpdatesT

type UpdateProps = {
  route: RouteProp<ParamList, 'Update'>
  navigation: StackNav
}

export default function Update({ route }: UpdateProps) {
  const { latestVersion } = route.params
  return (
    <>
      <View className='flex-1 items-center justify-between bg-white px-6 dark:bg-black'>
        <PaddingTop />
        <Lottie source={Animations.update} size={W * 0.85} speed={0.7} />
        <View className='gap-5'>
          <Bold className='text text-center' style={{ fontSize: 25 }}>
            Update Available {latestVersion}
          </Bold>
          <Medium className='text mt-2 text-center opacity-70' style={{ fontSize: 13 }}>
            A new version of the application is available. Please update the application to the latest version to
            continue using the application.
          </Medium>
        </View>
        <View className='pb-2 w-full'>
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
