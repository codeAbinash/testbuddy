import { postApi } from '@query/index'

export type VerifyOrderParams = {
  transactionId: string
  razorpayPaymentId: string
  razorpaySignature: string
}

export function verifyOrder(data: VerifyOrderParams) {
  return postApi('order/verify', data)
}
