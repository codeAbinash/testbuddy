import { FC, useEffect } from 'react'
import { View } from 'react-native'

import Animations from '@assets/animations/animations'
import Btn, { BtnTransparent } from '@components/Button'
import { Lottie } from '@components/Lottie'
import { PaddingBottom, PaddingTop } from '@components/SafePadding'
import { verifyOrder } from '@query/api/premium/verifyOrder'
import { queryClient } from '@query/query'
import { RouteProp } from '@react-navigation/native'
import { useMutation } from '@tanstack/react-query'
import { W } from '@utils/dimensions'
import { Bold, Medium } from '@utils/fonts'
import { StackNav } from '@utils/types'

type ParamList = {
  VerifyPayment: VerifyPaymentParamList
}

export type VerifyPaymentParamList = {
  transactionId: string
  razorpayPaymentId: string
  razorpaySignature: string
  programId: string
}

type VerifyPaymentProps = {
  route: RouteProp<ParamList, 'VerifyPayment'>
  navigation: StackNav
}

function VerifyPayment({ route, navigation }: VerifyPaymentProps) {
  const { transactionId, razorpayPaymentId, razorpaySignature, programId } = route.params

  const { mutate, data } = useMutation({
    mutationKey: ['verifyPayment', transactionId, razorpayPaymentId, razorpaySignature],
    mutationFn: () =>
      verifyOrder({
        razorpayPaymentId,
        razorpaySignature,
        transactionId,
      }),
    onSuccess: (d) => {
      if (d.success) {
        queryClient.invalidateQueries({ queryKey: ['testList', programId] })
        setTimeout(navigation.goBack, 3000)
      }
    },
  })

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    mutate()
  }, [])

  return (
    <View className='bg-screen flex-1'>
      <PaddingTop />
      {!data ? (
        <Verifying />
      ) : data?.success === true ? (
        <Verified />
      ) : (
        <VerificationFailed mutate={mutate} navigation={navigation} />
      )}
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

const Verified: FC = () => {
  return (
    <View className='flex-1 items-center justify-center pb-10'>
      <Lottie source={Animations.successful} style={{ height: W * 0.6, width: W }} loop={false} />
      <View className='mt-8 gap-5 px-10'>
        <Bold className='text text-center text-2xl'>Payment Verified</Bold>
        <Medium className='text text-center text-sm opacity-80'>
          Your payment has been verified. You will be redirected to the program page.
        </Medium>
      </View>
    </View>
  )
}

type VerifyFailedProps = {
  mutate: () => void
  navigation: StackNav
}
const VerificationFailed: FC<VerifyFailedProps> = ({ mutate, navigation }) => {
  return (
    <View className='flex-1 items-center justify-center pb-10'>
      <Lottie source={Animations.failed} style={{ height: W * 0.6, width: W }} loop={false} />
      <View className='mt-8 gap-5 px-10'>
        <Bold className='text text-center text-2xl'>Payment Verification Failed</Bold>
        <Medium className='text text-center text-sm opacity-80'>
          Your payment verification has failed. Please try again.
        </Medium>
      </View>
      <View className='mt-16 w-full gap-5 px-10'>
        <Btn title='Verify Again' onPress={mutate} />
        <BtnTransparent title='Go Back' onPress={() => navigation.goBack()} />
      </View>
    </View>
  )
}

export default VerifyPayment
