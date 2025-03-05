import { FC, useEffect } from 'react'
import { View } from 'react-native'

import popupStore from '@/zustand/popupStore'
import Animations from '@assets/animations/animations'
import { Lottie } from '@components/Lottie'
import { PaddingBottom, PaddingTop } from '@components/SafePadding'
import { verifyOrder } from '@query/api/premium/verifyOrder'
import { RouteProp } from '@react-navigation/native'
import { useMutation } from '@tanstack/react-query'
import { Bold, Medium } from '@utils/fonts'
import { StackNav } from '@utils/types'

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
  const alert = popupStore((state) => state.alert)

  const { mutate } = useMutation({
    mutationKey: ['verifyPayment', transactionId, razorpayPaymentId, razorpaySignature],
    mutationFn: () =>
      verifyOrder({
        razorpayPaymentId,
        razorpaySignature,
        transactionId,
      }),
    onSuccess: (data) => {
      console.log(data)
      if (!data.success)
        return alert('Payment verification failed', 'Your payment has been failed. Please try again.', [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ])

      if (data.success) return navigation.replace('PaymentSuccessful')

      navigation.goBack()
    },
  })

  useEffect(() => {
    mutate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
