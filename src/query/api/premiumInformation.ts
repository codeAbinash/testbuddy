import { postApi } from '..'

export type PremiumInformation = {
  programPackages?: {
    contentType?: string
    title?: string
    programPackages?: {
      _id?: string
      packages?: Package[]
    }
  }
}

export type Package = {
  _id: string
  packageName: string
  tag: string
  description: string
  pricings: Pricing[]
  coupons: Coupon[]
  gst: number
  includes: string[]
  updatedAt: Date
}

export type Coupon = {
  _id: string
  code: string
  discount: string
  expiresIn: number
}

export type Pricing = {
  _id: string
  duration: string
  price: number
  pricePerMonth: string
  validity: Date
}

export function premiumInformation(programId: string) {
  return postApi<PremiumInformation>('page/payment', { programId })
}
