import { InformationCircleStrokeRoundedIcon } from '@assets/icons/icons'
import Press from '@components/Press'
import { PaddingBottom } from '@components/SafePadding'
import { Package } from '@query/api'
import { useNavigation } from '@react-navigation/native'
import { Medium, SemiBold } from '@utils/fonts'
import { StackNav } from '@utils/types'
import { FC } from 'react'
import { View } from 'react-native'

type BuyNowProps = {
  selectedPackage: number
  selectedPricing: number
  packages: Package[]
}

const BuyNow: FC<BuyNowProps> = ({ selectedPackage, selectedPricing, packages }) => {
  const selectedPackageData = packages[selectedPackage]
  const selectedPricingData = selectedPackageData?.pricings?.[selectedPricing]
  const navigation = useNavigation<StackNav>()

  const handlePress = () => {
    navigation.navigate('PricingDetails', {})
  }

  return (
    <View className='bg-accent'>
      <View className='flex-row justify-between px-3.5 pb-3 pt-3'>
        <Press activeScale={0.99} onPress={handlePress}>
          <View className='flex-row items-center'>
            <SemiBold className='text-xl text-white'>₹ {selectedPricingData?.price}</SemiBold>
            <InformationCircleStrokeRoundedIcon color={'#fff'} height={18} width={18} style={{ marginLeft: 5 }} />
          </View>
          <Medium className='text-xs text-white'>{selectedPackageData?.packageName}</Medium>
        </Press>
        <BuyNowButton />
      </View>
      <PaddingBottom />
    </View>
  )
}

export default BuyNow

function BuyNowButton() {
  return (
    <Press>
      <View className='rounded-xl bg-white p-3 px-10'>
        <Medium className='text-center text-sm text-black'>Buy Now</Medium>
      </View>
    </Press>
  )
}
