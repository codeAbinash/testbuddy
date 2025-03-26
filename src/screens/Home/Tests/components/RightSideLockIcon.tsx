import popupStore from '@/zustand/popupStore'
import { PlayIcon, SquareUnlock01Icon } from '@assets/icons/icons'
import { useNavigation } from '@react-navigation/native'
import { Bold } from '@utils/fonts'
import { ColorScheme, StackNav } from '@utils/types'
import { TouchableOpacity } from 'react-native'
import colors from 'tailwindcss/colors'
import { Test } from '../TestList'

type RightLockOrPlayIconProps = {
  test: Test
  colorScheme: ColorScheme
  programId?: string
}
export default function RightLockOrPlayIcon({ test, colorScheme, programId = '' }: RightLockOrPlayIconProps) {
  const alert = popupStore((state) => state.alert)
  const navigation = useNavigation<StackNav>()
  const status = test.status
  function navigateToTest() {
    if (status === 'locked') return navigation.navigate('Premium', { programId: programId })
    alert('Are you sure?', 'Do you want to start the test?', [
      { text: 'No', onPress: () => {} },
      { text: 'Yes', onPress: () => navigation.navigate('Test', { testId: test.testId }) },
    ])
    console.log('navigating to test')
  }
  return (
    <TouchableOpacity
      className='flex-row items-center justify-center gap-1.5 rounded-lg border border-dashed border-zinc-500 p-1.5 px-2.5 pr-2'
      activeOpacity={0.6}
      onPress={navigateToTest}
    >
      <Bold className='text text-xs opacity-80' style={{ fontSize: 9 }}>
        {getStatusText(status)}
      </Bold>
      {status === 'locked' ? (
        <SquareUnlock01Icon
          height={15}
          width={15}
          color={colorScheme === 'dark' ? colors.zinc[400] : colors.zinc[700]}
        />
      ) : (
        <PlayIcon height={16} width={16} color={colorScheme === 'dark' ? colors.zinc[400] : colors.zinc[700]} />
      )}
    </TouchableOpacity>
  )
}

function getStatusText(status: string) {
  if (status === 'locked') return 'Locked'
  if (status === 'completed') return 'Completed'
  if (status === 'in-progress') return 'Resume'
  if (status === 'unlocked') return 'Start'
  return 'Start'
}
