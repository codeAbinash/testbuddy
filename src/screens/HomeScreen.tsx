import { useRefreshByUser } from '@/hooks/useRefreshByUser'
import Btn from '@components/Button'
import api from '@query/api'
import { useQuery } from '@tanstack/react-query'
import { W } from '@utils/dimensions'
import { Medium } from '@utils/fonts'
import type { NavProps } from '@utils/types'
import { useColorScheme } from 'nativewind'
import { useState } from 'react'
import { Image, RefreshControl, ScrollView, StatusBar, View } from 'react-native'
import Carousel from 'react-native-reanimated-carousel'
import colors from 'tailwindcss/colors'

function CarouselElem({ carousel }: { carousel: { imgSrc: string }[] }) {
  const [page, setPage] = useState(0)

  return (
    <View id='carousel-component'>
      <Carousel
        autoPlayInterval={2000}
        data={carousel}
        loop
        autoPlay
        pagingEnabled={true}
        snapEnabled={true}
        width={W}
        height={W * 0.55}
        style={{ width: W }}
        mode='parallax'
        renderItem={({ item, index }) => (
          <View key={index}>
            <Image source={{ uri: item.imgSrc }} style={{ width: W, height: W * 0.55 }} className='rounded-3xl' />
          </View>
        )}
        onSnapToItem={(index) => {
          setPage(index)
        }}
      />
      <View className='flex-row items-center justify-center' style={{ gap: 5 }}>
        {carousel.map((_, i) => (
          <View
            key={i}
            className={`h-2 w-2 rounded-full ${page === i ? 'bg-accent dark:bg-white' : 'bg-gray-500/30'}`}
            style={{ width: 8, height: 8, marginTop: -5 }}
          />
        ))}
      </View>
    </View>
  )
}

export default function HomeScreen({ navigation }: NavProps) {
  const { colorScheme } = useColorScheme()
  const { data, refetch } = useQuery({
    queryKey: ['homeScreen'],
    queryFn: api.homeScreen,
  })
  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch)

  return (
    <>
      <StatusBar barStyle='dark-content' backgroundColor={'transparent'} />
      <ScrollView
        className='bg-zinc-50 dark:bg-black'
        contentContainerClassName=''
        refreshControl={
          <RefreshControl
            refreshing={isRefetchingByUser}
            onRefresh={refetchByUser}
            style={{ zIndex: 1000 }}
            progressBackgroundColor={colorScheme === 'dark' ? colors.zinc[800] : 'white'}
            colors={colorScheme === 'dark' ? ['white'] : ['black']}
          />
        }
      >
        <CarouselElem carousel={carousel} />
        <View className='gap-5 p-5'>
          <Btn title='Start Test' onPress={() => navigation.navigate('Test', { testId: '66bbd61cc58453d49f06c7db' })} />
          <Btn
            title='View Result'
            onPress={() => navigation.navigate('Solution', { testId: '66bbd61cc58453d49f06c7db' })}
          />
          <Medium className='text-xs'>{JSON.stringify(data, null, 2)}</Medium>
        </View>
      </ScrollView>
    </>
  )
}

const carousel = [
  {
    imgSrc: 'https://picsum.photos/800',
  },

  {
    imgSrc: 'https://picsum.photos/802',
  },

  {
    imgSrc: 'https://picsum.photos/803',
  },

  {
    imgSrc: 'https://picsum.photos/804',
  },

  {
    imgSrc: 'https://picsum.photos/806',
  },
]
