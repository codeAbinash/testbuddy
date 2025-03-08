import BackHeader from '@screens/components/BackHeader'
import { Medium } from '@utils/fonts'
import { StackNav } from '@utils/types'
import { FC } from 'react'
import { View } from 'react-native'

type CounsellingProps = {
  navigation: StackNav
}

const Counselling: FC<CounsellingProps> = ({ navigation }) => {
  return (
    <>
      <BackHeader navigation={navigation} title='Predict College' />
      <View className='bg-screen flex-1'>
        <Medium>Counselling</Medium>
      </View>
    </>
  )
}

export default Counselling
