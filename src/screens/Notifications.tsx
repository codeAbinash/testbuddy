import { PaddingBottom } from '@components/SafePadding'
import type { NavProps } from '@utils/types'
import React from 'react'
import { Image, Text } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import BackHeader from './BackHeader'

export default function Notifications({ navigation }: NavProps) {
  return (
    <>
      <BackHeader title='Notifications' navigation={navigation} />
      <ScrollView contentContainerClassName='px-5 py-3 gap-5 screen-bg'>
        <Text className='text'>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure, cum. Quia commodi harum perferendis veniam,
          quidem minus rerum recusandae enim quibusdam fugit repellendus beatae sed assumenda quam. Amet dolorem aliquid
          at vel iure provident voluptatem delectus eius explicabo cum nobis quos sed atque porro, assumenda dolore est
          deserunt ad error reprehenderit, deleniti vero qui quam! Repudiandae voluptatibus in ut quasi, officiis ipsa
          perferendis quibusdam non eligendi molestiae et magni excepturi recusandae iure quo nesciunt nostrum enim. Et
          corporis eveniet expedita! Incidunt architecto rem aperiam odio asperiores ipsum! Natus, temporibus mollitia.
          Quo blanditiis excepturi rerum fuga quam vero corporis eius iure.
        </Text>
        <Image
          source={{ uri: 'https://www.sample-videos.com/img/Sample-png-image-500kb.png' }}
          style={{ width: '100%' }}
          className='aspect-video rounded-2xl'
        />
        <Text className='text'>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure, cum. Quia commodi harum perferendis veniam,
          quidem minus rerum recusandae enim quibusdam fugit repellendus beatae sed assumenda quam. Amet dolorem aliquid
          at vel iure provident voluptatem delectus eius explicabo cum nobis quos sed atque porro, assumenda dolore est
          deserunt ad error reprehenderit, deleniti vero qui quam! Repudiandae voluptatibus in ut quasi, officiis ipsa
          perferendis quibusdam non eligendi molestiae et magni excepturi recusandae iure quo nesciunt nostrum enim. Et
          corporis eveniet expedita! Incidunt architecto rem aperiam odio asperiores ipsum! Natus, temporibus mollitia.
          Quo blanditiis excepturi rerum fuga quam vero corporis eius iure.
        </Text>
        <Image
          source={{ uri: 'https://www.sample-videos.com/img/Sample-png-image-500kb.png' }}
          style={{ width: '100%' }}
          className='aspect-video rounded-2xl'
        />
        <Text className='text'>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure, cum. Quia commodi harum perferendis veniam,
          quidem minus rerum recusandae enim quibusdam fugit repellendus beatae sed assumenda quam. Amet dolorem aliquid
          at vel iure provident voluptatem delectus eius explicabo cum nobis quos sed atque porro, assumenda dolore est
          deserunt ad error reprehenderit, deleniti vero qui quam! Repudiandae voluptatibus in ut quasi, officiis ipsa
          perferendis quibusdam non eligendi molestiae et magni excepturi recusandae iure quo nesciunt nostrum enim. Et
          corporis eveniet expedita! Incidunt architecto rem aperiam odio asperiores ipsum! Natus, temporibus mollitia.
          Quo blanditiis excepturi rerum fuga quam vero corporis eius iure.
        </Text>
        <Image
          source={{ uri: 'https://www.sample-videos.com/img/Sample-png-image-500kb.png' }}
          style={{ width: '100%' }}
          className='aspect-video rounded-2xl'
        />
        <PaddingBottom />
      </ScrollView>
    </>
  )
}
