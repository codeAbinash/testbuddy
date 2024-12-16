import { playStoreUrl } from '@/constants'
import Btn from '@components/Button'
import { Lottie } from '@components/Lottie'
import BackHeader from '@screens/BackHeader'
import { W } from '@utils/dimensions'
import { Medium, SemiBold } from '@utils/fonts'
import type { NavProps } from '@utils/types'
import { Clipboard, Share, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

function shareWithFriends(referralCode: string) {
  Share.share({
    message: ((referralCode: string) => {
      return `Hey, I am using TestBuddy to prepare for my exams. Join me and get access to free study material, quizzes, and more. Use my referral code ${referralCode} to get started. Download the app now - ${playStoreUrl}`
    })(referralCode),
    title: 'Join me on TestBuddy',
    url: playStoreUrl,
  })
}

export default function Refer({ navigation }: NavProps) {
  const referralCode = 'ABINASH65445'
  return (
    <>
      <BackHeader title='Referral' navigation={navigation} />
      <ScrollView contentContainerClassName='px-5 py-3 gap-5 screen-bg flex-1'>
        <Lottie
          source={require('../../assets/animations/lottie/refer.lottie')}
          style={{ width: '100%', height: W * 0.9 }}
        />
        <View className='px-5'>
          <SemiBold className='text text-center text-xl'>Share with a friend</SemiBold>
          <Medium className='text mt-3 text-center text-sm opacity-80'>
            Share the journey of learning. Refer a friend and enjoy educational rewards and exclusive content!
          </Medium>
          <View className='mt-8 flex-row items-center justify-center gap-3'>
            <TouchableOpacity
              className='flex-1 rounded-xl border border-dashed border-black/50 bg-white p-3 px-6 dark:border-white/50 dark:bg-black'
              onPress={() => Clipboard.setString('ABINASH65445')}
              activeOpacity={0.7}
            >
              <Medium className='text pb-0.5 text-center'>{referralCode}</Medium>
            </TouchableOpacity>
            <TouchableOpacity
              className='rounded-xl border bg-accent p-3 px-6 dark:bg-zinc-100'
              activeOpacity={0.7}
              onPress={() => Clipboard.setString(referralCode)}
            >
              <Medium className='pb-0.5 text-white dark:text-black'>Copy</Medium>
            </TouchableOpacity>
          </View>
          <View className='mt-8 flex-row items-center justify-center gap-1'>
            <View className='-2 flex-1 rounded-full bg-zinc-200 dark:bg-zinc-800'>
              <View className='h-2 w-1/3 rounded-full bg-accent dark:bg-zinc-100'></View>
            </View>
            <Medium className='text flex-0 mx-3 text-sm opacity-80' style={{ fontSize: 11 }}>
              3/10 Done
            </Medium>
          </View>
          <View>
            <Medium className='text mt-2 text-center text-sm opacity-80' style={{ fontSize: 11 }}>
              Earn a special reward when 10 friends join using your referral code. Share now! click on the button below.
            </Medium>
          </View>
          <View className='mt-7'>
            <Btn title='Share with your friends' onPress={() => shareWithFriends(referralCode)} />
          </View>
        </View>
      </ScrollView>
    </>
  )
}
