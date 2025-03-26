import { playStoreUrl } from '@/constants'
import Animations from '@assets/animations/animations'
import Btn from '@components/Button'
import { Lottie } from '@components/Lottie'
import BackHeader from '@screens/components/BackHeader'
import { W } from '@utils/dimensions'
import { Medium, SemiBold } from '@utils/fonts'
import { Clipboard, Share, ToastAndroid, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

function shareWithFriends(referralCode: string) {
  Share.share({
    message: ((code: string) => {
      return `Hey, I am using TestBuddy to prepare for my exams. Join me and get access to free study material, quizzes, and more. Use my referral code ${code} to get started. Download the app now - ${playStoreUrl}`
    })(referralCode),
    title: 'Join me on TestBuddy',
    url: playStoreUrl,
  })
}

export default function Refer() {
  const referralCode = 'ABINASH65445'
  return (
    <>
      <BackHeader title='Referral' />
      <ScrollView contentContainerClassName='px-5 py-3 pt-0 gap-5 bg-screen flex-1'>
        <Lottie source={Animations.refer} style={{ width: '100%', height: W * 0.9 }} />
        <View className='-mt-5 gap-10 px-5'>
          <View className='gap-5'>
            <SemiBold className='text text-center text-xl'>Share with a friend</SemiBold>
            <Medium className='text text-center text-sm opacity-80'>
              Share the journey of learning. Refer a friend and enjoy educational rewards and exclusive content!
            </Medium>
            <View className='mt-3 flex-row items-center justify-center gap-3'>
              <TouchableOpacity
                className='flex-1 rounded-xl border border-dashed border-black/50 bg-white p-3 px-6 dark:border-white/50 dark:bg-black'
                onPress={() => copyToClipboard(referralCode)}
                activeOpacity={0.7}
              >
                <SemiBold className='text text-center text-sm'>{referralCode}</SemiBold>
              </TouchableOpacity>
              <TouchableOpacity
                className='rounded-xl border bg-accent p-3 px-6 dark:bg-zinc-100'
                activeOpacity={0.7}
                onPress={() => copyToClipboard(referralCode)}
              >
                <SemiBold className='text-sm text-white dark:text-black'>Copy</SemiBold>
              </TouchableOpacity>
            </View>
          </View>
          <View className='gap-4'>
            <View className='flex-row items-center justify-center gap-1'>
              <View className='flex-1 rounded-full bg-zinc-200 dark:bg-zinc-800'>
                <View className='h-2 w-1/3 rounded-full bg-accent dark:bg-zinc-100'></View>
              </View>
              <Medium className='text flex-0 mx-3 text-sm opacity-80' style={{ fontSize: 11 }}>
                3/10 Done
              </Medium>
            </View>
            <View>
              <Medium className='text text-center text-sm opacity-80' style={{ fontSize: 11 }}>
                Earn a special reward when 10 friends join using your referral code. Share now! Click on the button
                below.
              </Medium>
            </View>
            <View className='mt-4'>
              <Btn title='Share with your friends' onPress={() => shareWithFriends(referralCode)} />
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  )
}

function copyToClipboard(referralCode: string) {
  ToastAndroid.show('Referral code copied', ToastAndroid.SHORT)
  Clipboard.setString(referralCode)
}
