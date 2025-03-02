import { Pricing } from '@query/api'
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
        className={`mb-2 rounded-full pb-2 text-center ${isSelected ? 'bg-green-500/20 text-green-500' : 'text'} `}
      >
        6 months
      </SemiBold>
      <TouchableOpacity
        onPress={() => setSelectedPricing(index)}
        className={`w-40 rounded-2xl p-5 dark:bg-zinc-950 ${isSelected ? 'border-green-500' : 'border-zinc-500/20 dark:border-zinc-500/50'}`}
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
