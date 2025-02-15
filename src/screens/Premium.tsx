import TopBar from '@components/TopBar'
import { SemiBold } from '@utils/fonts'
import { StatusBar, View } from 'react-native'

const Premium = () => {
  return (
    <>
      <StatusBar barStyle='default' />
      <View className='flex-1 justify-between bg-white dark:bg-zinc-950'>
        <View>
          <TopBar />
          <SemiBold className='text mt-2 text-center text-lg'>Premium</SemiBold>
        </View>
      </View>
    </>
  )
}

export default Premium
