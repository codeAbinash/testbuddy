import { createOrder } from '@query/api/premium/createOrder'
import Colors from '@utils/colors'
import RazorpayCheckout, { CheckoutOptions, SuccessResponse } from 'react-native-razorpay'

export interface Error {
  description: string
  code: number
  error: {
    reason: string
    metadata: {}
    step: string
    source: string
    description: string
    code: string
  }
}

type PaymentResponse = {
  error?: Error
  success?: SuccessResponse
}

export async function razorpayPayment(data: Awaited<ReturnType<typeof createOrder>>): Promise<PaymentResponse> {
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

  try {
    const paymentResponse = await RazorpayCheckout.open(options)
    return {
      success: paymentResponse,
    }
  } catch (error: unknown) {
    return {
      error: error as Error,
    }
  }
}
