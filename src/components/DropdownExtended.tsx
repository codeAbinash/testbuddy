import { JosefinSansMedium, Medium } from '@utils/fonts'
import { ColorScheme } from '@utils/types'
import { StyleSheet, View } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown'
import { DropdownProps } from 'react-native-element-dropdown/lib/typescript/components/Dropdown/model'
import type { SvgProps } from 'react-native-svg'
import colors from 'tailwindcss/colors'
import { InputIcon } from './Input'

export type DropdownData = {
  label: string
  value: string
  Icon: React.FC<SvgProps>
}

export type DropdownExtendedT<T> = {
  value: string | null
  colorScheme: ColorScheme
  Left: React.ReactNode
} & DropdownProps<T>

export default function DropdownExtended<T extends DropdownData>({ colorScheme, Left, ...rest }: DropdownExtendedT<T>) {
  return (
    <View
      style={{ borderRadius: 14.5 }}
      className='w-full flex-row items-center gap-3 border border-zinc-200 bg-zinc-100 px-4 dark:border-zinc-800 dark:bg-zinc-900'
    >
      {Left}
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={[{ color: colors.zinc[500] }, styles.textStyle]}
        selectedTextStyle={[styles.textStyle, { color: colorScheme === 'dark' ? colors.zinc[200] : colors.zinc[800] }]}
        inputSearchStyle={[
          {
            fontSize: 12.5,
            borderRadius: 10,
            backgroundColor: colorScheme === 'dark' ? colors.zinc[950] : colors.zinc[100],
            borderColor: colorScheme === 'dark' ? colors.zinc[800] : colors.zinc[200],
            color: colorScheme === 'dark' ? colors.zinc[200] : colors.zinc[800],
          },
        ]}
        maxHeight={100}
        placeholder='Select item'
        searchPlaceholder='Search...'
        autoScroll
        fontFamily={JosefinSansMedium.fontFamily}
        activeColor={colorScheme === 'dark' ? colors.zinc[800] : colors.zinc[200]}
        containerStyle={{
          flex: 1,
          borderRadius: 14.5,
          borderWidth: 0.5,
          overflow: 'hidden',
          borderColor: colorScheme === 'dark' ? colors.zinc[700] : 'transparent',
          backgroundColor: colorScheme === 'dark' ? colors.zinc[900] : colors.zinc[50],
        }}
        renderItem={renderItem}
        {...rest}
      />
    </View>
  )
}

function renderItem<T extends DropdownData>(item: T) {
  return (
    <View className='flex-row items-center gap-3 px-5' style={{ borderRadius: 14.5, height: 49.5 }}>
      <InputIcon Icon={item.Icon} />
      <Medium className='text text-sm'>{item.label}</Medium>
    </View>
  )
}

const styles = StyleSheet.create({
  dropdown: {
    flex: 1,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  textStyle: {
    fontSize: 12.5,
    flex: 1,
    paddingTop: 13,
    paddingBottom: 17,
  },
})
