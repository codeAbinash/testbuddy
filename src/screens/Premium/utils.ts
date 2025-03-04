import popupStore from '@/zustand/popupStore'
import { createOrder } from '@query/api/premium/createOrder'
import Colors from '@utils/colors'
import RazorpayCheckout, { CheckoutOptions, SuccessResponse } from 'react-native-razorpay'

export function razorpayPayment(
  data: Awaited<ReturnType<typeof createOrder>>,
  onSuccess?: (res: SuccessResponse) => void,
  onError?: () => void,
) {
  const { alert } = popupStore.getState()

  if (data.isAlert) {
    return alert('Wrong', data.message || 'Unknown Error Occurred')
  }

  const options: CheckoutOptions = {
    description: 'Test Transaction',
    // TODO(abinash): Change this icon to app type icon
    image: 'https://testbuddy.live/logo.png',
    order_id: data.transactionOrderId,
    key: data.paymentKey,
    amount: data.amount,
    currency: 'INR',
    name: 'Testbuddy',
    theme: {
      color: Colors.accent,
    },
  }

  RazorpayCheckout.open(options).then(onSuccess).catch(onError)
}
