import { FC, useEffect } from 'react'
import { StatusBar, View } from 'react-native'

import popupStore from '@/zustand/popupStore'
import { LoadingFullScreen } from '@components/Loading'
import { createOrder } from '@query/api/counselling/createOrder'
import getPaymentKey from '@query/api/premium/getPaymentKey'
import { razorpayPayment } from '@screens/Premium/utils'
import { useQuery } from '@tanstack/react-query'
import { NavProps } from '@utils/types'

const CounsellingPremium: FC<NavProps> = ({ navigation }) => {
  const alert = popupStore((store) => store.alert)

  const { data: paymentKey } = useQuery({
    queryKey: ['payment', 'key'],
    queryFn: getPaymentKey,
  })

  async function payment() {
    const res = await createOrder()
    const data = await razorpayPayment({
      amount: res.amount,
      paymentKey: paymentKey?.key || '',
      transactionOrderId: res.transactionOrderId,
    })

    if (data.error)
      return alert('Payment Failed', 'Payment is not successful. Please try again.', [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ])

    navigation.replace('VerifyPayment', {
      transactionId: res._id,
      razorpayPaymentId: data.success?.razorpay_payment_id ?? '',
      razorpaySignature: data.success?.razorpay_signature ?? '',
    })
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (paymentKey?.key) {
      payment()
    }
  }, [paymentKey])

  return (
    <>
      <StatusBar barStyle='default' />
      <View className='flex-1 justify-between bg-white dark:bg-zinc-950'>
        <LoadingFullScreen text='Talking to the servers' />
      </View>
    </>
  )
}

export default CounsellingPremium
