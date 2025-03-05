import { useEffect } from 'react'
import { View } from 'react-native'

import Animations from '@assets/animations/animations'
import { Lottie } from '@components/Lottie'
import { PaddingBottom, PaddingTop } from '@components/SafePadding'
import { Bold, Medium } from '@utils/fonts'
import { NavProps } from '@utils/types'

const PaymentSuccessful = ({ navigation }: NavProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.goBack()
      // TODO: Reset the react query cache here
    }, 3000)

    return () => clearTimeout(timer)
  }, [navigation])

  return (
    <View className='bg-screen flex-1'>
      <PaddingTop />
      <View className='flex-1 items-center justify-center pb-10'>
        <Lottie source={Animations.successful} loop={false} />
        <View className='mt-8 gap-5 px-10'>
          <Bold className='text text-center text-2xl'>Payment Successful</Bold>
          <Medium className='text text-center text-sm opacity-80'>
            Thank you for your payment. Your subscription will be activated shortly. You will be redirected to the
            course page
          </Medium>
        </View>
      </View>
      <PaddingBottom />
    </View>
  )
}

export default PaymentSuccessful
