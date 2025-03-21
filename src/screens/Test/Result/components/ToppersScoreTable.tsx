import { Medium } from '@utils/fonts'
import { FC } from 'react'
import { View } from 'react-native'
import colors from 'tailwindcss/colors'
import { Result } from '../types/result'

type ToppersScoreTableProps = {
  toppersScoreTable?: Result['toppersScoresTable']
}

const ToppersScoreTable: FC<ToppersScoreTableProps> = ({ toppersScoreTable }) => {
  return (
    <View
      className='mt-5'
      style={{
        borderLeftWidth: 0.7,
        borderTopWidth: 0.7,
        borderColor: colors.zinc[500],
      }}
    >
      <View className='flex-row items-center justify-between'>
        <Cell name='Rank' flex={0.7} />
        <Cell name='Name' flex={2} />
      </View>
      <View className=''>
        {toppersScoreTable?.map((topper) => (
          <View key={topper.rank} className='flex-row items-center justify-between'>
            <Cell name={topper.rank} flex={0.7} />
            <Cell name={topper.name} flex={2} />
          </View>
        ))}
      </View>
    </View>
  )
}

function Cell({ name, flex }: { name: string | number; flex?: number }) {
  return (
    <View
      className='py-2.5'
      style={{
        borderRightWidth: 0.7,
        borderBottomWidth: 0.7,
        borderColor: colors.zinc[500],
        flex: flex || 1,
      }}
    >
      <Medium className='text text-center text-xs capitalize'>{name}</Medium>
    </View>
  )
}

export default ToppersScoreTable
