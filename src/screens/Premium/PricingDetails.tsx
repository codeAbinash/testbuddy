import { FC } from 'react'
import { ScrollView, StatusBar, View } from 'react-native'

import { RouteProp } from '@react-navigation/native'

import Btn from '@components/Button'
import { PaddingBottom } from '@components/SafePadding'
import { AppBar } from '@components/TopBar'
import { createOrder } from '@query/api/premium/createOrder'
import getPaymentKey from '@query/api/premium/getPaymentKey'
import { Coupon, Package } from '@query/api/premium/premiumInformation'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Medium, SemiBold } from '@utils/fonts'
import type { StackNav } from '@utils/types'
import CouponsList from './components/CouponsList'
import couponStore from './couponStore'
import { razorpayPayment } from './utils'

type ParamList = {
  PricingDetails: PricingDetailsParamList
}

export type PricingDetailsParamList = {
  packages: Package[]
  selectedPackage: number
  selectedPricing: number
  coupons: Coupon[]
}

type PricingDetailsProps = {
  route: RouteProp<ParamList, 'PricingDetails'>
  navigation: StackNav
}

const PricingDetails: FC<PricingDetailsProps> = ({ route }) => {
  const { selectedCoupon } = couponStore()
  const { coupons, selectedPackage, selectedPricing, packages } = route.params

  const packageData = packages[selectedPackage]
  const coupon = coupons[selectedCoupon]

  const pricing = packageData?.pricings?.[selectedPricing]
  const originalPrice = pricing?.price ?? 0
  const couponDiscount = parseFloat(coupon?.discount ?? '0')
  const gst = packageData?.gst ?? 0

  const discountPrice = (originalPrice * couponDiscount) / 100
  const discountedPrice = originalPrice - discountPrice
  const gstPrice = (discountedPrice * gst) / 100
  const finalAmount = Math.round(discountedPrice + gstPrice)

  const validUpto = pricing?.validity ?? new Date()
  const couponCode = coupon?.code ?? ''

  const packageId = packageData?._id || ''
  const pricingId = pricing?._id || ''

  const { data: paymentKey, isLoading: isPaymentKeyLoading } = useQuery({
    queryKey: ['payment', 'key'],
    queryFn: getPaymentKey,
  })

  const { mutate, isPending } = useMutation({
    mutationKey: ['order', 'create', couponCode, finalAmount],
    mutationFn: () =>
      createOrder({
        couponCode,
        finalAmount,
        packageId,
        pricingId,
      }),
    onSuccess: (data) => {
      data.paymentKey = paymentKey?.key || ''
      razorpayPayment(data, console.log, console.log)
    },
  })

  function handlePress() {
    mutate()
  }

  return (
    <>
      <StatusBar barStyle='default' />
      <View className='flex-1 justify-between bg-white dark:bg-zinc-950'>
        <AppBar />
        <ScrollView className='p-5 pt-0'>
          <SemiBold className='text text-center'>Pricing Details</SemiBold>
          <View className='mt-5 gap-3 rounded-3xl border border-dashed border-zinc-500/50 bg-zinc-100 p-5 dark:bg-zinc-900'>
            <Row
              title='Valid Upto'
              value={new Date(validUpto).toLocaleString('en-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
                minute: 'numeric',
                hour: 'numeric',
              })}
            />
            <Row title='Original Price:' value={originalPrice} />
            <Row title='Coupon:' value={couponCode} />
          </View>
          <CouponsList coupons={coupons} />
          <View className='mt-5 gap-3 rounded-3xl border border-dashed border-zinc-500/50 bg-zinc-100 p-5 dark:bg-zinc-900'>
            <Row title='Discount:' value={discountPrice} />
            <Row title='Discounted Price:' value={discountedPrice} />
            <Row title={`GST(${gst}%):`} value={gstPrice} />
          </View>
          <View className='mt-5 gap-3 rounded-3xl border border-dashed border-zinc-500/50 bg-zinc-100 p-5 dark:bg-zinc-900'>
            <Row title='Total:' value={finalAmount} />
          </View>
        </ScrollView>
        <View className='p-5 pb-3'>
          <Btn
            title={isPending ? 'Processing...' : `Buy Now for ₹${Math.round(finalAmount)}`}
            onPress={handlePress}
            disabled={isPending || isPaymentKeyLoading}
          />
          <PaddingBottom />
        </View>
      </View>
    </>
  )
}

function Row({ title, value }: { title: string; value: string | number }) {
  return (
    <View className='flex-row justify-between'>
      <Medium className='text'>{title}</Medium>
      <Medium className='text'>{typeof value === 'number' ? `₹ ${Math.round(value)}` : value}</Medium>
    </View>
  )
}

export default PricingDetails
