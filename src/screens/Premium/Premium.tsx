import { FC, useState } from 'react'
import { StatusBar, View } from 'react-native'

import { RouteProp } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query'
import { ScrollView } from 'react-native-gesture-handler'

import { Loading } from '@components/Loading'
import { AppBar } from '@components/TopBar'
import { premiumInformation } from '@query/api/premium/premiumInformation'
import { Medium, SemiBold } from '@utils/fonts'
import type { StackNav } from '@utils/types'
import BuyNow from './components/BuyNow'
import CouponsList from './components/CouponsList'
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

  const { data, isLoading } = useQuery({
    queryKey: ['premium', programId],
    queryFn: () => premiumInformation(programId),
  })

  const [selectedPackage, setSelectedPackage] = useState<number>(0)
  const [selectedPricing, setSelectedPricing] = useState<number>(0)

  const packages = data?.programPackages?.programPackages?.packages
  const pricings = packages?.[selectedPackage]?.pricings
  const include = packages?.[selectedPackage]?.includes
  const coupons = packages?.[selectedPackage]?.coupons

  return (
    <>
      <StatusBar barStyle='default' />
      <View className='flex-1 justify-between bg-white dark:bg-zinc-950'>
        <AppBar />
        {isLoading && <PremiumLoading />}
        {!isLoading && (
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
            <CouponsList coupons={coupons || []} />
          </ScrollView>
        )}
        {!isLoading && (
          <BuyNow
            selectedPackage={selectedPackage}
            packages={packages || []}
            selectedPricing={selectedPricing}
            coupons={coupons || []}
          />
        )}
      </View>
    </>
  )
}

const PremiumLoading: FC = () => {
  return (
    <View className='flex-1 items-center justify-center'>
      <Loading />
      <Medium className='text mt-3 text-center text-sm opacity-90'>Loading Plans...</Medium>
    </View>
  )
}

export default Premium
