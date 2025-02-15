import { defaultProfilePic } from '@/constants'
import { Diamond02Icon, PencilEdit01Icon } from '@assets/icons/icons'
import Press from '@components/Press'
import { PaddingTop } from '@components/SafePadding'
import api from '@query/api'
import { useQuery } from '@tanstack/react-query'
import { F, Medium, SemiBold } from '@utils/fonts'
import type { NavProps } from '@utils/types'
import { getFirstName } from '@utils/utils'
import { Image, View } from 'react-native'
import colors from 'tailwindcss/colors'
import { Tabs, type TabData } from './Tabs'

function ProfileTopArea({ navigation }: NavProps) {
  const { data } = useQuery({
    queryKey: ['profile'],
    queryFn: api.profile,
  })

  return (
    <>
      <View className='w-full bg-white px-5 pb-2 pr-4 dark:bg-zinc-950'>
        <PaddingTop />
        <View className='flex-row items-center justify-between'>
          <Press className='flex-shrink flex-row items-center gap-3' onPress={() => navigation.navigate('EditProfile')}>
            <View className='flex-shrink flex-row items-center justify-center gap-3'>
              <Image source={{ uri: data?.profilePic || defaultProfilePic }} className='h-14 w-14 rounded-full' />
              <View className='flex-shrink'>
                <SemiBold className='text mr-2 flex-shrink text-sm' numberOfLines={1}>
                  Hi, {getFirstName(data?.name) ?? 'User'}
                </SemiBold>
                <Medium className='text text-xs opacity-80'>{data?.std}</Medium>
              </View>
            </View>
            <PencilEdit01Icon height={20} width={20} color={colors.zinc[500]} />
          </Press>
          <View className='flex-row items-center justify-center gap-3'>
            <Press
              className='flex-row items-center justify-center gap-1 rounded-xl bg-amber-500 px-3.5 py-3'
              onPress={() => navigation.navigate('Premium')}
            >
              <Diamond02Icon color={'white'} height={15} width={15} />
              <Medium className='text-xs text-white' style={F.F10_5}>
                Upgrade to Premium
              </Medium>
            </Press>
          </View>
        </View>
      </View>
    </>
  )
}

export default function HomeProfile({ navigation }: NavProps) {
  return (
    <View className='pt-3'>
      <ProfileTopArea navigation={navigation} />
      <View className='pt-3'>
        <Tabs tabsData={tabData} />
      </View>
    </View>
  )
}

const tabData: TabData[] = [
  {
    title: 'My Progress',
    content: <MyProgress />,
  },
  {
    title: 'Attempted Test',
    content: <AcademicTest />,
  },
  {
    title: 'Bookmarks',
    content: <Bookmarks />,
  },
  {
    title: 'Personalized Tests',
    content: <PersonalizedTest />,
  },
]

function MyProgress() {
  return (
    <View className='p-5'>
      <Medium className='text'>My Progress</Medium>
    </View>
  )
}

function AcademicTest() {
  return (
    <View className='p-5'>
      <Medium className='text'>Attempted Test</Medium>
    </View>
  )
}

function Bookmarks() {
  return (
    <View className='p-5'>
      <Medium className='text'>Bookmarks</Medium>
    </View>
  )
}

function PersonalizedTest() {
  return (
    <View className='p-5'>
      <Medium className='text'>Personalized Test</Medium>
    </View>
  )
}
