import { postApi } from '@query/index'

export type PaymentKey = {
  key: string
}

export default function getPaymentKey() {
  return postApi<PaymentKey>('payment/key')
}
