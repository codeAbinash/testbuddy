import { FC, useMemo } from 'react'
import { FlatList, TouchableOpacity, View } from 'react-native'

import popupStore from '@/zustand/popupStore'
import {
  FemaleSymbolStrokeRoundedIcon,
  InformationCircleStrokeRoundedIcon,
  MaleSymbolStrokeRoundedIcon,
} from '@assets/icons/icons'
import { type College } from '@query/api'
import { RouteProp } from '@react-navigation/native'
import BackHeader from '@screens/components/BackHeader'
import { Medium, SemiBold } from '@utils/fonts'
import { ColorScheme, StackNav } from '@utils/types'
import { useColorScheme } from 'nativewind'
import colors from 'tailwindcss/colors'
import { PaddingBottom } from '@components/SafePadding'

type ParamList = {
  CollegeList: CollegeListParamList
}

export type CollegeListParamList = {
  data: College[]
}

type CollegeListProps = {
  route: RouteProp<ParamList, 'CollegeList'>
  navigation: StackNav
}

const CollegeList: FC<CollegeListProps> = ({ route, navigation }) => {
  const { data } = route.params
  const { colorScheme } = useColorScheme()

  const allData = useMemo(() => {
    if (data.length === 5) {
      const extraData = Array.from({ length: 10 }, () => ({ ...data[0], isBlur: true }) as College)
      return [...data, ...extraData]
    }
    return data
  }, [data])

  return (
    <>
      <BackHeader navigation={navigation} title='Predicted College List' />
      <FlatList
        className='bg-screen flex-1'
        data={allData}
        renderItem={({ item }) => (
          <College item={item} scheme={colorScheme} isBlur={item.isBlur} navigation={navigation} />
        )}
        contentContainerStyle={{
          borderColor: colorScheme === 'dark' ? colors.zinc[900] : colors.zinc[100],
          borderTopWidth: 1,
          borderRightWidth: 0,
          borderLeftWidth: 0,
          borderBottomWidth: 0,
        }}
        keyExtractor={(item, index) => item._id + index}
        ListFooterComponent={<PaddingBottom />}
      />
    </>
  )
}

type CollegeProps = {
  item: College
  scheme: ColorScheme
  isBlur?: boolean
  navigation?: StackNav
}

const College: FC<CollegeProps> = ({ item, scheme, isBlur }) => {
  const alert = popupStore((state) => state.alert)
  return (
    <TouchableOpacity
      className='relative items-center justify-center border bg-white p-4 py-3 dark:bg-black'
      style={{
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderColor: scheme === 'dark' ? colors.zinc[800] : colors.zinc[100],
      }}
      disabled={!isBlur}
      // TODO: Add navigation to Premium screen
      onPress={() => alert('Unlock Premium.', 'You will be redirected to the premium screen.')}
      activeOpacity={0.8}
    >
      <View className='w-full'>
        <View className='flex-row justify-between'>
          <View className='flex-1' style={{ filter: isBlur ? 'blur(3px)' : 'none' }}>
            <SemiBold className='text text-sm'>{item.instituteName}</SemiBold>
            <Medium className='text text-xs opacity-70'>{item.academicProgramName}</Medium>
          </View>
          <TouchableOpacity
            onPress={() => alert('Gender', item.gender)}
            disabled={isBlur}
            style={{ filter: isBlur ? 'blur(3px)' : 'none' }}
          >
            {item.gender.toLowerCase().includes('female') ? (
              <FemaleSymbolStrokeRoundedIcon height={24} width={24} color={colors.pink[500]} />
            ) : item.gender.toLowerCase().includes('male') ? (
              <MaleSymbolStrokeRoundedIcon height={24} width={24} color={colors.blue[500]} />
            ) : (
              <InformationCircleStrokeRoundedIcon height={20} width={20} color={colors.zinc[500]} />
            )}
          </TouchableOpacity>
        </View>
        <Medium className='mt-1 text-xs text-blue-500' style={{ filter: isBlur ? 'blur(3px)' : 'none' }}>
          Rank {item.openingRank} - {item.closingRank}
        </Medium>
        <View className='mt-2 flex-row gap-2' style={{ filter: isBlur ? 'blur(3px)' : 'none' }}>
          <Tag tag={item.instituteType} />
          <Tag tag={item.quota} />
          <Tag tag={item.seatType} />
          <Tag tag={item.year} />
          <Tag tag={'Round ' + item.round} />
        </View>
      </View>
      {isBlur && (
        <View className='absolute'>
          <SemiBold className='text-sm text-orange-500'>Unlock Premium to view more colleges.</SemiBold>
        </View>
      )}
    </TouchableOpacity>
  )
}

type TagProps = {
  tag: string
}

const Tag: FC<TagProps> = ({ tag }) => {
  return (
    <View className='rounded-lg bg-zinc-200 px-3 py-1 pt-1.5 dark:bg-zinc-800'>
      <Medium className='text text-xs'>{tag}</Medium>
    </View>
  )
}

export default CollegeList
