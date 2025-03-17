import { postApi } from '@query/index'

export type CreateOrderRes = {
  _id: string
  package: string
  user: string
  amount: number
  validity: Date
  status: string
  createdAt: Date
  updatedAt: Date
  __v: number
  receipt: string
  transactionOrderId: string
}

export function createOrder() {
  return postApi<CreateOrderRes>('counselling/order/create')
}
