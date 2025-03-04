import { Lottie } from '@components/Lottie'
import { PaddingBottom, PaddingTop } from '@components/SafePadding'
import { useNavigation } from '@react-navigation/native'
import { W } from '@utils/dimensions'
import { Bold, Medium } from '@utils/fonts'
import { StackNav } from '@utils/types'
import { useEffect, useState } from 'react'
import { View } from 'react-native'

export default function Example() {
  return (
    <View className='bg-screen flex-1'>
      <PaddingTop />
      <Successful />
      <PaddingBottom />
    </View>
  )
}



export function Successful() {
  const navigation = useNavigation<StackNav>()
  const lastRoute = navigation.getState().routes.at(-2)?.name

  const [countdown, setCountdown] = useState(5)

  console.log(lastRoute)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1)
    }, 1000)

    const timeout = setTimeout(() => {
      if (lastRoute === 'PricingDetails') {
        navigation.pop(2)
      } else {
        navigation.pop()
      }
    }, 5000)

    return () => {
      clearInterval(timer)
      clearTimeout(timeout)
    }
  }, [lastRoute, navigation])

  return (
    <View className='flex-1 items-center justify-center pb-10'>
      <Lottie
        source={require('../assets/animations/json/successful.json')}
        style={{
          height: W * 0.8,
          width: W,
        }}
        loop={false}
      />
      <View className='gap-5 px-10'>
        <Bold className='text text-center text-2xl'>Payment Successful</Bold>
        <Medium className='text text-center text-sm opacity-80'>
          Redirecting you to the home screen in {countdown} seconds.
        </Medium>
      </View>
    </View>
  )
}
