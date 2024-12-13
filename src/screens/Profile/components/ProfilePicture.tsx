import { defaultProfilePic } from '@/constants'
import { PaintBrush01StrokeRoundedIcon } from '@assets/icons/icons'
import Press from '@components/Press'
import { ColorScheme } from '@utils/types'
import { Image, View } from 'react-native'

export default function ProfilePicture({ picture, scheme }: { picture?: string; scheme: ColorScheme }) {
  return (
    <View className='items-center justify-center py-5'>
      <Press className='relative' activeOpacity={0.9}>
        <Image
          source={{ uri: picture || defaultProfilePic }}
          className='rounded-full'
          style={{ width: 150, height: 150 }}
        />
        <Press
          className='absolute rounded-full border border-transparent bg-white p-2.5 shadow dark:border-gray-800 dark:bg-zinc-900'
          style={{ bottom: '5%', right: '1%' }}
        >
          <PaintBrush01StrokeRoundedIcon height={22} width={22} color={scheme === 'dark' ? 'white' : 'black'} />
        </Press>
      </Press>
    </View>
  )
}
