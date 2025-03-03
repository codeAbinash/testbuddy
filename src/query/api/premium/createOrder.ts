import { postApi } from '@query/index'

export type OrderDetails = {
  packageId: string
  pricingId: string
  finalAmount: number
  couponCode: string
}
export type CreateOrder = {
  _id: string
  package: string
  user: string
  pricing: string
  amount: number
  validity: Date
  status: string
  createdAt: Date
  updatedAt: Date
  __v: number
  receipt: string
  transactionOrderId: string
}
export function createOrder(orderDetails: OrderDetails) {
  return postApi<CreateOrder>('order/create', orderDetails)
}
