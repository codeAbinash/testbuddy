import { FC } from 'react'
import { ScrollView, StatusBar, View } from 'react-native'

import { RouteProp } from '@react-navigation/native'

import Btn from '@components/Button'
import { PaddingBottom } from '@components/SafePadding'
import { AppBar } from '@components/TopBar'
import { Coupon, Package } from '@query/api/premium/premiumInformation'
import { Medium, SemiBold } from '@utils/fonts'
import type { StackNav } from '@utils/types'
import CouponsList from './components/CouponsList'
import couponStore from './couponStore'

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

const PricingDetails: FC<PricingDetailsProps> = ({ route, navigation }) => {
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
          <Btn title='Got it!' onPress={() => navigation.goBack()} />
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
