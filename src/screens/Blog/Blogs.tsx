import Btn from '@components/Button'
import { PaddingBottom } from '@components/SafePadding'
import api from '@query/api'
import BackHeader from '@screens/components/BackHeader'
import { useQuery } from '@tanstack/react-query'
import type { NavProps } from '@utils/types'
import { ScrollView, View } from 'react-native'

export default function Blogs({ navigation }: NavProps) {
  const { data } = useQuery({
    queryFn: api.blogs,
    queryKey: ['blogs'],
  })

  return (
    <>
      <BackHeader title='Blogs' />
      <View className='screen-bg flex-1'>
        <ScrollView contentContainerClassName='screen-bg gap-3 px-3 pb-0 py-5'>
          <Btn
            title='6725d3d5b110f3fb01b5754e'
            onPress={() => navigation.navigate('Blog', { id: '6725d3d5b110f3fb01b5754e' })}
          />
          {data?.map((blog) => (
            <Btn title={blog.title} key={blog._id} onPress={() => navigation.navigate('Blog', { id: blog._id })} />
          ))}
          <PaddingBottom />
        </ScrollView>
      </View>
    </>
  )
}
