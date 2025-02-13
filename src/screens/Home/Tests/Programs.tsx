import { ArrowRight01StrokeStandardIcon } from '@assets/icons/icons'
import { PaddingBottom } from '@components/SafePadding'
import type { ProgramList } from '@query/api'
import type { RouteProp } from '@react-navigation/native'
import BackHeader from '@screens/components/BackHeader'
import { Medium } from '@utils/fonts'
import type { ColorScheme, StackNav } from '@utils/types'
import { useColorScheme } from 'nativewind'
import { FlatList, Image, TouchableOpacity, View } from 'react-native'
import colors from 'tailwindcss/colors'

type ParamList = {
  Programs: ProgramsParamList
}

export type ProgramsParamList = {
  test: ProgramList
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
            <Medium style={{ fontSize: 18 }}>No Programs Available</Medium>
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
        ListFooterComponent={<PaddingBottom />}
      />
    </>
  )
}

type ProgramProps = {
  scheme: ColorScheme
  navigation: StackNav
  program: NonNullable<ProgramList['programs']>[0]
  image: string
}

function Program({ scheme, navigation, image, program }: ProgramProps) {
  const navigateToTest = () => {
    if (!program._id) return
    navigation.navigate('TestList', { programId: program._id || '' })
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
      <Image source={{ uri: image }} style={{ height: 40, width: 40 }} />
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
