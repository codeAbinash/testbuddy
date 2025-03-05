import { postApi } from '@query/index'

export type VerifyOrderParams = {
  transactionId: string
  razorpayPaymentId: string
  razorpaySignature: string
}

type VerifyResponse = {
  success: boolean
  redirectTo: string
}
export function verifyOrder(data: VerifyOrderParams) {
  return postApi<VerifyResponse>('order/verify', data)
}
