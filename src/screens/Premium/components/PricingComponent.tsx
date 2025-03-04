import { Pricing } from '@query/api/premium/premiumInformation'
import { SemiBold } from '@utils/fonts'
import { FC } from 'react'
import { TouchableOpacity, View } from 'react-native'

export type PricingProps = {
  isSelected: boolean
  item: Pricing
  setSelectedPricing: (value: number) => void
  index: number
}

export const PricingComponent: FC<PricingProps> = ({ isSelected, item, setSelectedPricing, index }) => {
  return (
    <View>
      <SemiBold
        className={`mb-2 rounded-full pb-2 text-center ${isSelected ? 'bg-green-500/20 text-green-500' : 'text bg-zinc-100 dark:bg-zinc-900'}`}
      >
        6 months
      </SemiBold>
      <TouchableOpacity
        onPress={() => setSelectedPricing(index)}
        className={`w-40 rounded-2xl p-5 border-dashed ${isSelected ? 'border-green-500 bg-green-500/15' : 'border-zinc-500/40 bg-zinc-100 dark:bg-zinc-900'}`}
        activeOpacity={0.7}
        style={{ borderWidth: 1.5 }}
      >
        <View>
          <SemiBold className='text text-center text-lg'>₹ {item.price} /-</SemiBold>
          <SemiBold className='text text-center opacity-80'>₹ {item.pricePerMonth}/month</SemiBold>
        </View>
      </TouchableOpacity>
    </View>
  )
}
