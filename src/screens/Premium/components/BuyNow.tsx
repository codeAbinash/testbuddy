import { FC } from 'react'
import { View } from 'react-native'

import { useNavigation } from '@react-navigation/native'

import { InformationCircleStrokeRoundedIcon } from '@assets/icons/icons'
import Press, { CustomPressProps } from '@components/Press'
import { PaddingBottom } from '@components/SafePadding'
import { createOrder } from '@query/api/premium/createOrder'
import { Coupon, Package } from '@query/api/premium/premiumInformation'
import { useMutation } from '@tanstack/react-query'
import { Medium, SemiBold } from '@utils/fonts'
import { StackNav } from '@utils/types'
import couponStore from '../couponStore'
import { razorpayPayment } from '../utils'

export type BuyNowProps = {
  selectedPackage: number
  selectedPricing: number
  packages: Package[]
  coupons: Coupon[]
}

function calculateFinalPrice(price: number, couponDiscount: number, gst: number) {
  const discountedPrice = price - (price * couponDiscount) / 100
  return Math.round(discountedPrice + (discountedPrice * gst) / 100)
}

const BuyNow: FC<BuyNowProps> = ({ selectedPackage, selectedPricing, packages, coupons }) => {
  const navigation = useNavigation<StackNav>()

  const selectedPackageData = packages[selectedPackage]
  const selectedPricingData = selectedPackageData?.pricings?.[selectedPricing]
  const { selectedCoupon } = couponStore()

  const price = selectedPricingData?.price ?? 0
  const couponDiscount = parseFloat(selectedPackageData?.coupons?.[selectedCoupon]?.discount ?? '0')
  const gst = selectedPackageData?.gst ?? 0
  const finalAmount = calculateFinalPrice(price, couponDiscount, gst)

  const packageId = selectedPackageData?._id || ''
  const pricingId = selectedPricingData?._id || ''
  const couponCode = coupons[selectedCoupon]?.code ?? ''

  const { mutate, isPending } = useMutation({
    mutationKey: ['order', 'create', couponCode, finalAmount],
    mutationFn: () =>
      createOrder({
        couponCode,
        finalAmount,
        packageId,
        pricingId,
      }),
    onSuccess: (res) => {
      razorpayPayment(res, console.log, console.log)
    },
  })

  const buyNow = () => {
    mutate()
  }

  const handlePress = () => {
    navigation.navigate('PricingDetails', {
      selectedPackage,
      selectedPricing,
      coupons: selectedPackageData?.coupons ?? [],
      packages,
    })
  }

  return (
    <View className='bg-accent'>
      <View className='flex-row justify-between px-3.5 pb-3 pt-3'>
        <Press activeScale={0.99} onPress={handlePress}>
          <View className='flex-row items-center'>
            <SemiBold className='text-xl text-white'>₹ {finalAmount}</SemiBold>
            <InformationCircleStrokeRoundedIcon color={'#fff'} height={18} width={18} style={{ marginLeft: 5 }} />
          </View>
          <Medium className='text-xs text-white'>{selectedPackageData?.packageName}</Medium>
        </Press>
        <BuyNowButton onPress={buyNow} disabled={isPending} text={isPending ? 'Processing...' : 'Buy Now'} />
      </View>
      <PaddingBottom />
    </View>
  )
}

export default BuyNow

type BuyNowButtonProps = CustomPressProps & {
  text?: string
}
const BuyNowButton: FC<BuyNowButtonProps> = ({ text = 'Buy Now', ...props }) => {
  return (
    <Press {...props}>
      <View className='rounded-xl bg-white p-3 px-10'>
        <Medium className='text-center text-sm text-black'>{text}</Medium>
      </View>
    </Press>
  )
}
