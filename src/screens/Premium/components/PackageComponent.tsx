import { Package } from '@query/api/premium/premiumInformation'
import { Medium, SemiBold } from '@utils/fonts'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

export type PackageProps = {
  item: Package
  selectedPackage: number
  setSelectedPackage: (value: number) => void
  index: number
}

export function PackageSelector({ item, selectedPackage, setSelectedPackage, index }: PackageProps) {
  const isSelected = selectedPackage === index
  const selectedClassName = isSelected ? selectedClassname : defaultClassName

  return (
    <View className='relative w-full'>
      <View>
        <SemiBold className={`absolute z-10 ml-5 rounded-full px-4 ${selectedClassName}`} style={styles.tag}>
          {item.tag}
        </SemiBold>
      </View>
      <TouchableOpacity
        className={`w-full rounded-2xl p-5 dark:bg-zinc-950 ${isSelected ? 'border-green-500' : 'border-zinc-500/20 dark:border-zinc-500/50'}`}
        onPress={() => setSelectedPackage(index)}
        activeOpacity={0.7}
        style={{ borderWidth: 1.5 }}
      >
        <SemiBold className='text text-sm'>{item.packageName}</SemiBold>
        <Medium className='text text-xs opacity-80'>{item.description}</Medium>
        <Medium className='text text-xs opacity-80'>
          Starting from{'  '}
          <SemiBold className='text-xs text-blue-500 opacity-80'>
            ₹ {item?.pricings?.[0]?.pricePerMonth ?? 'N/A'} / month
          </SemiBold>
        </Medium>
      </TouchableOpacity>
    </View>
  )
}

const selectedClassname = 'border-green-500 bg-green-100 text-green-500 dark:bg-green-900'
const defaultClassName = 'border-zinc-500/20 bg-white text-black dark:border-zinc-500/50 dark:bg-black dark:text-white'

export const styles = StyleSheet.create({
  tag: { borderWidth: 1.5, fontSize: 9, height: 30, marginTop: -15, lineHeight: 28 },
})
