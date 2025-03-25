import BackHeader from '@screens/components/BackHeader'
import { NavProps } from '@utils/types'
import { FC } from 'react'
import { View } from 'react-native'

const BookmarkedBlogs: FC<NavProps> = ({ navigation }) => {
  return (
    <>
      <BackHeader title='Bookmarked Blogs' navigation={navigation} />
      <View></View>
    </>
  )
}

export default BookmarkedBlogs
