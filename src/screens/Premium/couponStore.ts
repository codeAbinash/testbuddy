import { create } from 'zustand'

type CouponStore = {
  selectedCoupon: number
  setSelectedCoupon: (value: number) => void
}

const couponStore = create<CouponStore>((set) => ({
  selectedCoupon: 0,
  setSelectedCoupon: (value) => set({ selectedCoupon: value }),
}))

export default couponStore
