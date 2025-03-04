import Animations from '@assets/animations/animations'
import { Lottie } from '@components/Lottie'
import { PaddingBottom, PaddingTop } from '@components/SafePadding'
import { RouteProp } from '@react-navigation/native'
import { Bold, Medium } from '@utils/fonts'
import { StackNav } from '@utils/types'
import { FC } from 'react'
import { View } from 'react-native'

type ParamList = {
  VerifyPayment: VerifyPaymentParamList
}

export type VerifyPaymentParamList = {
  transactionId: string
  razorpayPaymentId: string
  razorpaySignature: string
}

type VerifyPaymentProps = {
  route: RouteProp<ParamList, 'VerifyPayment'>
  navigation: StackNav
}

function VerifyPayment({ route, navigation }: VerifyPaymentProps) {
  const { transactionId, razorpayPaymentId, razorpaySignature } = route.params

  return (
    <View className='bg-screen flex-1'>
      <PaddingTop />
      <Verifying />

      <PaddingBottom />
    </View>
  )
}

const Verifying: FC = () => {
  return (
    <View className='flex-1 items-center justify-center pb-10'>
      <Lottie source={Animations.verifying} />
      <View className='mt-8 gap-5 px-10'>
        <Bold className='text text-center text-2xl'>Verifying Payment</Bold>
        <Medium className='text text-center text-sm opacity-80'>
          Please wait while we verify your payment. Do not close the app otherwise your payment will not be processed.
        </Medium>
      </View>
    </View>
  )
}

export default VerifyPayment
