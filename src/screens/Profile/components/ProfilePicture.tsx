import { defaultProfilePic } from '@/constants'
import popupStore from '@/zustand/popupStore'
import { PaintBrush01StrokeRoundedIcon } from '@assets/icons/icons'
import Press from '@components/Press'
import api from '@query/api/api'
import { queryClient } from '@query/query'
import { useMutation } from '@tanstack/react-query'
import { ColorScheme } from '@utils/types'
import { useState } from 'react'
import { ActivityIndicator, Image, ToastAndroid, View } from 'react-native'
import { launchImageLibrary } from 'react-native-image-picker'

export default function ProfilePicture({ picture, scheme }: { picture?: string; scheme: ColorScheme }) {
  const [image, setImage] = useState<null | string>(null)
  const alert = popupStore((state) => state.alert)
  const { mutate, isPending } = useMutation({
    mutationKey: ['uploadProfilePicture'],
    mutationFn: api.updateProfilePic,
    onSuccess(data) {
      if (data.isAlert)
        return alert('Error', data.message || 'Something wrong with the image, please select another image')
      queryClient.invalidateQueries({ queryKey: ['profile'] })
      ToastAndroid.show('Profile Pic Uploaded', ToastAndroid.SHORT)
    },
  })

  function handlePress() {
    if (isPending) return
    launchImageLibrary({ mediaType: 'photo', selectionLimit: 1, assetRepresentationMode: 'compatible' }, (data) => {
      if (data.assets && data.assets[0]?.uri) {
        setImage(data.assets[0].uri)
        uploadProfilePicture(data.assets[0].uri)
      } else setImage(null)
    })
  }

  function uploadProfilePicture(uri?: string) {
    ToastAndroid.show('Uploading...', ToastAndroid.SHORT)
    const formData = new FormData()
    const fileType = uri?.split('.').pop() || 'jpeg'
    formData.append('image', { uri, name: `image.${fileType}`, type: `image/${fileType}` })
    if (image) mutate(formData)
  }

  return (
    <>
      <View className='items-center justify-center py-5'>
        <Press className='relative' activeOpacity={0.9} onPress={handlePress}>
          <Image
            source={{ uri: image || picture || defaultProfilePic }}
            className='rounded-full'
            style={{ width: 150, height: 150 }}
            blurRadius={isPending ? 10 : 0}
          />
          <Press
            className='absolute rounded-full border border-transparent bg-white p-2.5 shadow dark:border-zinc-800 dark:bg-zinc-900'
            style={{ bottom: '5%', right: '1%' }}
            onPress={handlePress}
          >
            {isPending ? (
              <ActivityIndicator size={25} color={scheme === 'dark' ? 'white' : 'black'} />
            ) : (
              <PaintBrush01StrokeRoundedIcon height={22} width={22} color={scheme === 'dark' ? 'white' : 'black'} />
            )}
          </Press>
        </Press>
      </View>
    </>
  )
}
