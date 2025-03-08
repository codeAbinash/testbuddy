import Press from '@components/Press'
import { SemiBold } from '@utils/fonts'
import { FC } from 'react'
import { View } from 'react-native'

type RadioProps = {
  value?: 'Yes' | 'No'
  onChange?: (value: 'Yes' | 'No') => void
  disabled?: boolean
  children?: React.ReactNode
  options?: ('Yes' | 'No')[]
}

const Radio: FC<RadioProps> = ({ value, onChange, options }) => {
  return (
    <View className='mt-3 flex-row gap-2'>
      {options?.map((option, index) => (
        <Press
          key={index}
          className={`${value === option ? 'bg-zinc-900 dark:bg-zinc-100' : 'bg-zinc-200 dark:bg-zinc-800'} rounded-full p-2.5 px-9`}
          onPress={() => onChange?.(option)}
        >
          <SemiBold
            className={`${value === option ? 'text-zinc-100 dark:text-zinc-900' : 'text-zinc-700 dark:text-zinc-300'} text-sm`}
          >
            {option}
          </SemiBold>
        </Press>
      ))}
    </View>
  )
}

export default Radio
