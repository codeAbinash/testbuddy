import { InformationCircleIcon } from '@assets/icons/icons'
import { useNavigation } from '@react-navigation/native'
import { Medium } from '@utils/fonts'
import { ColorScheme, StackNav } from '@utils/types'
import { TouchableOpacity } from 'react-native'
import colors from 'tailwindcss/colors'

type ViewInstructionsProps = {
  colorScheme: ColorScheme
  setOpen: (open: boolean) => void
}

export default function ViewInstructions({ colorScheme, setOpen }: ViewInstructionsProps) {
  const navigation = useNavigation<StackNav>()
  return (
    <TouchableOpacity
      className='w-full flex-row items-center justify-start px-4 py-2'
      activeOpacity={0.7}
      onPress={() => {
        setOpen(false)
        navigation.navigate('Instructions')
      }}
    >
      <InformationCircleIcon
        width={17}
        height={17}
        color={colorScheme === 'dark' ? colors.zinc[300] : colors.zinc[700]}
      />
      <Medium className='text pb-0.5 pl-2.5 text-sm'>View Instructions</Medium>
    </TouchableOpacity>
  )
}
