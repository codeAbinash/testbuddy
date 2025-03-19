import { FC, useEffect, useMemo } from 'react'
import { TouchableOpacity, View } from 'react-native'

import popupStore from '@/zustand/popupStore'
import Animations from '@assets/animations/animations'
import {
  Diamond02Icon,
  FemaleSymbolStrokeRoundedIcon,
  InformationCircleStrokeRoundedIcon,
  MaleSymbolStrokeRoundedIcon,
} from '@assets/icons/icons'
import { LoadingFullScreen } from '@components/Loading'
import { Lottie } from '@components/Lottie'
import Press from '@components/Press'
import { PaddingBottom } from '@components/SafePadding'
import { type College, counsellingApi } from '@query/api'
import { RouteProp, useIsFocused } from '@react-navigation/native'
import BackHeader from '@screens/components/BackHeader'
import { useQuery } from '@tanstack/react-query'
import { Bold, F, Medium, SemiBold } from '@utils/fonts'
import { ColorScheme, StackNav } from '@utils/types'
import { useColorScheme } from 'nativewind'
import { FlatList } from 'react-native-gesture-handler'
import colors from 'tailwindcss/colors'

type ParamList = {
  CollegeList: CollegeListParamList
}

export type CollegeListParamList = {
  mainsCRLRank: number
  mainsCategoryRank: number
  advancedCRLRank?: number
  advancedCategoryRank?: number
  homeState: string
  category: string
  quota: string
  pwdCategory: boolean
}

type CollegeListProps = {
  route: RouteProp<ParamList, 'CollegeList'>
  navigation: StackNav
}

const CollegeList: FC<CollegeListProps> = ({ route, navigation }) => {
  const isFocused = useIsFocused()
  const collegeInfo = route.params
  const { colorScheme } = useColorScheme()

  const {
    data: collegeList,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ['counsellingList'],
    queryFn: () => counsellingApi(collegeInfo),
  })

  const data = collegeList?.data || []
  const isPremium = data.length > 5

  const allData = useMemo(() => {
    if (!isPremium) {
      const extraData = Array.from({ length: 5 }, () => ({ ...data[0], isBlur: true }) as College)
      return [...data, ...extraData]
    }
    return data
  }, [data, isPremium])

  useEffect(() => {
    if (isFocused) refetch()
  }, [isFocused, refetch])

  return (
    <>
      <BackHeader navigation={navigation} title='Predicted College List' />
      {isPending ? (
        <LoadingFullScreen text='Fetching College List...' />
      ) : (
        <View className='flex-1'>
          <FlatList
            className='bg-screen flex-1'
            data={allData}
            renderItem={({ item, index }) => (
              <College item={item} scheme={colorScheme} isBlur={item.isBlur} navigation={navigation} index={index} />
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
        </View>
      )}
    </>
  )
}

type CollegeProps = {
  item: College
  index: number
  scheme: ColorScheme
  isBlur?: boolean
  navigation?: StackNav
}

const College: FC<CollegeProps> = ({ item, scheme, isBlur, navigation, index }) => {
  const alert = popupStore((state) => state.alert)
  return (
    <View>
      {index === 5 && <UpgradeToPremium onPress={() => navigation?.navigate('CounsellingPremium')} />}
      <TouchableOpacity
        className='relative items-center justify-center border bg-white p-4 py-3 dark:bg-black'
        style={{
          borderTopWidth: 0,
          borderLeftWidth: 0,
          borderRightWidth: 0,
          borderColor: scheme === 'dark' ? colors.zinc[800] : colors.zinc[100],
        }}
        disabled={!isBlur}
        onPress={() => navigation?.navigate('CounsellingPremium')}
        activeOpacity={0.8}
      >
        <View className='w-full'>
          <View className='flex-row justify-between'>
            <View className='flex-1' style={{ filter: isBlur ? 'blur(3px)' : 'none' }}>
              <SemiBold className='text text-sm'>{item.instituteName}</SemiBold>
              <Medium className='text text-xs opacity-70' numberOfLines={1}>
                {item.academicProgramName}
              </Medium>
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
      </TouchableOpacity>
    </View>
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

type UpgradeToPremiumProps = {
  onPress: () => void
}
const UpgradeToPremium: FC<UpgradeToPremiumProps> = ({ onPress }) => {
  return (
    <View className='items-center justify-center absolute w-full z-10 pt-24'>
      <Bold className='text text-md text-white'>Upgrade to Premium to view more colleges</Bold>
      <Lottie source={Animations.premium} style={{ height: 170, width: 170 }} frame={200} />
      <Press
        className='flex-row items-center justify-center gap-1 rounded-xl bg-amber-500 px-3.5 py-3 mt-5'
        onPress={onPress}
      >
        <Diamond02Icon color={'white'} height={15} width={15} />
        <Medium className='text-xs text-white' style={F.F10_5}>
          Upgrade to Premium
        </Medium>
      </Press>
    </View>
  )
}

export default CollegeList
