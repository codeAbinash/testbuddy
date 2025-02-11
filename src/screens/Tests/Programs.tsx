import popupStore from '@/zustand/popupStore'
import { ArrowRight01StrokeStandardIcon } from '@assets/icons/icons'
import type { TestApiT } from '@query/api'
import type { RouteProp } from '@react-navigation/native'
import BackHeader from '@screens/BackHeader'
import { Medium } from '@utils/fonts'
import type { ColorScheme, StackNav } from '@utils/types'
import { useColorScheme } from 'nativewind'
import { FlatList, Image, TouchableOpacity, View, type ImageSourcePropType } from 'react-native'
import colors from 'tailwindcss/colors'
const jeeAdv = require('../../assets/images/src/jee-adv.png') as ImageSourcePropType

type ParamList = {
  Programs: ProgramsParamList
}

export type ProgramsParamList = {
  test: TestApiT
}

type ProgramsProps = {
  route: RouteProp<ParamList, 'Programs'>
  navigation: StackNav
}

export default function Programs({ navigation, route }: ProgramsProps) {
  const test = route.params.test
  const { colorScheme } = useColorScheme()
  return (
    <>
      <BackHeader title={test.examTitle + ` (${test.programs?.length} Programs)`} navigation={navigation} />
      <FlatList
        data={test.programs}
        keyExtractor={(item) => item._id || ''}
        renderItem={({ item }) => (
          <Program navigation={navigation} program={item} scheme={colorScheme} image={test.logo || ''} />
        )}
        ListEmptyComponent={
          <View className='flex-1 items-center justify-center'>
            <Medium className='text text-lg'>No Programs Available</Medium>
          </View>
        }
        contentContainerStyle={{
          borderColor: colorScheme === 'dark' ? colors.zinc[900] : colors.zinc[100],
          borderTopWidth: 1,
          borderRightWidth: 0,
          borderLeftWidth: 0,
          borderBottomWidth: 0,
        }}
        contentContainerClassName=''
      ></FlatList>
    </>
  )
}

type ProgramProps = {
  scheme: ColorScheme
  navigation: StackNav
  program: NonNullable<TestApiT['programs']>[0]
  image: string
}

function Program({ scheme, navigation, image, program }: ProgramProps) {
  const alert = popupStore((state) => state.alert)
  const navigateToTest = () => {
    if (!program._id) return
    alert('Are you sure?', 'Are you sure you want to start this test?', [
      { text: 'No' },
      { text: 'Yes', onPress: () => navigation.navigate('Test', { testId: program._id || '' }) },
    ])
  }
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={navigateToTest}
      className='h-100 flex-row items-center justify-between gap-5 p-5 py-3'
      style={{
        borderWidth: 1,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderColor: scheme === 'dark' ? colors.zinc[900] : colors.zinc[100],
      }}
    >
      <Image source={jeeAdv} style={{ height: 40, width: 40 }} />
      <View className='flex-1'>
        <Medium className='text text-sm'>{program?.title}</Medium>
        <Medium className='text text-xs opacity-80'>{program._id}</Medium>
      </View>
      <ArrowRight01StrokeStandardIcon
        height={22}
        width={22}
        color={scheme === 'dark' ? colors.zinc[500] : colors.zinc[500]}
      />
    </TouchableOpacity>
  )
}
