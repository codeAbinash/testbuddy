import { W } from '@utils/dimensions'
import { useState } from 'react'
import { Image, View } from 'react-native'
import Carousel from 'react-native-reanimated-carousel'

export default function CarouselElem({ carousel }: { carousel: { imgSrc: string }[] }) {
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
