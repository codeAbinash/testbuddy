import { AppBar } from '@components/TopBar'
import { Coupon, premiumInformation } from '@query/api'
import { RouteProp } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query'
import { Medium, SemiBold } from '@utils/fonts'
import type { StackNav } from '@utils/types'
import { FC, useState } from 'react'
import { StatusBar, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import BuyNow from './components/BuyNow'
import { PackageSelector } from './components/PackageComponent'
import { PricingComponent } from './components/PricingComponent'

type ParamList = {
  Premium: PremiumParamList
}

export type PremiumParamList = {
  programId: string
}

type PremiumProps = {
  route: RouteProp<ParamList, 'Premium'>
  navigation: StackNav
}

const Premium: FC<PremiumProps> = ({ route }) => {
  const { programId } = route.params
  const { data } = useQuery({
    queryKey: ['premium', programId],
    queryFn: () => premiumInformation(programId),
  })

  const [selectedPackage, setSelectedPackage] = useState<number>(0)
  const [selectedPricing, setSelectedPricing] = useState<number>(0)
  const [selectedCoupon, setSelectedCoupon] = useState<number>(0)

  const packages = data?.programPackages?.programPackages?.packages
  const pricings = packages?.[selectedPackage]?.pricings
  const include = packages?.[selectedPackage]?.includes
  const coupons = packages?.[selectedPackage]?.coupons

  return (
    <>
      <StatusBar barStyle='default' />
      <View className='flex-1 justify-between bg-white dark:bg-zinc-950'>
        <AppBar />
        <ScrollView className='flex-1 p-5 pt-0' contentContainerClassName='pb-10'>
          <SemiBold className='text text-center text-lg'>Choose a package</SemiBold>
          <View className='mt-5 items-center justify-center gap-8'>
            {packages?.map((item, index) => (
              <PackageSelector
                key={index}
                item={item}
                selectedPackage={selectedPackage}
                setSelectedPackage={setSelectedPackage}
                index={index}
              />
            ))}
          </View>
          <View className='mt-10 flex-row flex-wrap items-center justify-center gap-8'>
            {pricings?.map((item, index) => (
              <PricingComponent
                key={index}
                item={item}
                isSelected={selectedPricing === index}
                setSelectedPricing={setSelectedPricing}
                index={index}
              />
            ))}
          </View>
          <View>
            <SemiBold className='text mt-10 text-center text-lg'>Package Includes</SemiBold>
            <View className='mt-5 flex-row flex-wrap gap-3'>
              {include?.map((item, index) => (
                <Medium className='text text-xs' key={index}>
                  {index + 1}. {item}
                </Medium>
              ))}
            </View>
          </View>
          <CouponsList selectedCoupon={selectedCoupon} setSelectedCoupon={setSelectedCoupon} coupons={coupons || []} />
        </ScrollView>
        <BuyNow
          selectedPackage={selectedPackage}
          packages={packages || []}
          selectedPricing={selectedPricing}
          selectedCoupon={selectedCoupon}
        />
      </View>
    </>
  )
}

type CouponProps = {
  selectedCoupon: number
  setSelectedCoupon: (value: number) => void
  coupons: Coupon[]
}
function CouponsList({ selectedCoupon, setSelectedCoupon, coupons }: CouponProps) {
  return (
    <View className='mt-7'>
      <SemiBold className='text text-center text-lg'>Available Coupons</SemiBold>
      <View className='mt-5 gap-3'>
        {coupons.length > 0 ? (
          coupons.map((coupon, index) => (
            <TouchableOpacity
              key={coupon._id}
              className={`flex-row items-center justify-between rounded-2xl border-dashed px-5 py-4 ${selectedCoupon === index ? 'border-blue-500' : 'border-zinc-500/50'}`}
              onPress={() => setSelectedCoupon(index)}
              activeOpacity={0.7}
              style={{ borderWidth: 1.5 }}
            >
              <SemiBold className='text text-sm'>{coupon.code}</SemiBold>
              <SemiBold className='text-xs text-green-500'>Discount {coupon.discount}</SemiBold>
            </TouchableOpacity>
          ))
        ) : (
          <Medium className='text text-xs'>No coupons available</Medium>
        )}
      </View>
    </View>
  )
}

export default Premium
