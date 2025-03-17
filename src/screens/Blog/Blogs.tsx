import Btn from '@components/Button'
import { ErrorFullScreen } from '@components/ErrorDisplay'
import { LoadingFullScreen } from '@components/Loading'
import { PaddingBottom } from '@components/SafePadding'
import api from '@query/api/api'
import BackHeader from '@screens/components/BackHeader'
import { useQuery } from '@tanstack/react-query'
import type { NavProps, StackNav } from '@utils/types'
import { FC } from 'react'
import { ScrollView, View } from 'react-native'

export default function Blogs({ navigation }: NavProps) {
  const { data, isLoading } = useQuery({
    queryFn: api.blogs,
    queryKey: ['blogs'],
  })

  if (isLoading) return <LoadingFullScreen text='Loading Blogs' />

  const blogPostId = '6725d3d5b110f3fb01b5754e'

  return (
    <>
      <BackHeader title='Blogs' navigation={navigation} />
      <View className='bg-screen flex-1'>
        <ScrollView contentContainerClassName='bg-screen gap-3 px-3 pb-0 py-5'>
          <Btn
            title={blogPostId}
            onPress={() => navigation.navigate('Blog', { id: blogPostId })}
          />
          <List navigation={navigation} data={data} />
          <PaddingBottom />
        </ScrollView>
      </View>
    </>
  )
}

type ListProps = {
  navigation: StackNav
  data: Awaited<ReturnType<typeof api.blogs>> | undefined
}
const List: FC<ListProps> = ({ navigation, data }) => {
  if (data?.isAlert)
    return <ErrorFullScreen text={data.message || 'Internal Server Error'} />

  return (
    <>
      {
        data?.map((blog) => (
          <Btn title={blog.title} key={blog._id} onPress={() => navigation.navigate('Blog', { id: blog._id })} />
        ))
      }
    </>
  )
} 