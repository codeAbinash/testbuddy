import { Mail02StrokeRoundedIcon, StudentsStrokeRoundedIcon, UserStrokeRoundedIcon } from '@assets/icons/icons'
import DropdownExtended from '@components/DropdownExtended'
import Input, { InputIcon } from '@components/Input'
import { PaddingBottom, PaddingTop } from '@components/SafePadding'
import { useColorScheme } from 'nativewind'
import { useState } from 'react'
import { ScrollView, View } from 'react-native'
import type { SvgProps } from 'react-native-svg'

type Data = {
  label: string
  value: string
  Icon: React.FC<SvgProps>
}
const data: Data[] = [
  { label: 'Engineering', value: 'engineering', Icon: StudentsStrokeRoundedIcon },
  { label: 'Medical', value: 'medical', Icon: UserStrokeRoundedIcon },
]
// const data: Data[] = [
//   { label: 'Item 1', value: '1' },
//   { label: 'Item 2', value: '2' },
//   { label: 'Item 3', value: '3' },
//   { label: 'Item 4', value: '4' },
//   { label: 'Item 5', value: '5' },
//   { label: 'Item 6', value: '6' },
//   { label: 'Item 7', value: '7' },
//   { label: 'Item 8', value: '8' },
// ]

export default function Test() {
  const [value, setValue] = useState<null | string>(null)
  const { colorScheme } = useColorScheme()

  return (
    <ScrollView className='flex-1 p-5'>
      <PaddingTop />
      <View className='gap-3'>
        <Input placeholder='Input' Left={<InputIcon Icon={Mail02StrokeRoundedIcon} />} />
        <DropdownExtended<Data>
          colorScheme={colorScheme}
          value={value}
          onChange={(item) => setValue(item?.value ?? null)}
          data={data}
          labelField={'label'}
          valueField={'value'}
          Left={<InputIcon Icon={Mail02StrokeRoundedIcon} />}
        />
      </View>
      <PaddingBottom />
    </ScrollView>
  )
}
