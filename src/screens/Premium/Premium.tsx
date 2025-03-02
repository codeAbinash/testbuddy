import { AppBar } from '@components/TopBar'
import { premiumInformation } from '@query/api'
import { RouteProp } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query'
import { SemiBold } from '@utils/fonts'
import type { StackNav } from '@utils/types'
import { FC, useState } from 'react'
import { ScrollView, StatusBar, View } from 'react-native'
import BuyNow from './components/BuyNow'
import { PackageComponent } from './components/PackageComponent'

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

const Premium: FC<PremiumProps> = ({ navigation, route }) => {
  const { programId } = route.params
  const { data } = useQuery({
    queryKey: ['premium', programId],
    queryFn: () => premiumInformation(programId),
  })

  const packages = data?.programPackages?.programPackages?.packages
  const [selectedPackage, setSelectedPackage] = useState<number>(0)
  const [selectedPricing, setSelectedPricing] = useState<number>(0)

  return (
    <>
      <StatusBar barStyle='default' />
      <View className='flex-1 justify-between bg-white dark:bg-zinc-950'>
        <AppBar />
        <ScrollView className='p-5 pt-0'>
          <SemiBold className='text text-center text-lg'>Choose a package</SemiBold>
          <View className='mt-10 items-center justify-center gap-8'>
            {packages?.map((item, index) => (
              <PackageComponent
                key={index}
                item={item}
                selectedPackage={selectedPackage}
                setSelectedPackage={setSelectedPackage}
                index={index}
              />
            ))}
          </View>
        </ScrollView>
        <BuyNow selectedPackage={selectedPackage} packages={packages || []} selectedPricing={selectedPricing} />
      </View>
    </>
  )
}

export default Premium
