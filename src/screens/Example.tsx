import { Mail02StrokeRoundedIcon } from '@assets/icons/icons'
import Btn from '@components/Button'
import Input, { InputIcon } from '@components/Input'
import { PaddingBottom, PaddingTop } from '@components/SafePadding'
import { useState } from 'react'
import { Image, ScrollView, View } from 'react-native'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'

export default function Example() {
  const [image, setImage] = useState<null | string>(null)

  function handlePress() {
    launchImageLibrary({ mediaType: 'photo', selectionLimit: 1, assetRepresentationMode: 'compatible' }, (data) => {
      setImage(data.assets && data.assets[0]?.uri ? data.assets[0].uri : null)
    })
  }

  return (
    <ScrollView className='flex-1 p-5'>
      <PaddingTop />
      <View className='gap-3'>
        {image ? <Image source={{ uri: image }} className='aspect-[9/16]' /> : null}
        <Input placeholder='Input' Left={<InputIcon Icon={Mail02StrokeRoundedIcon} />} />
        <Btn title='Open Camera' onPress={() => launchCamera({ mediaType: 'photo' }, () => {})} />
        <Btn title='Open Image' onPress={handlePress} />
      </View>
      <PaddingBottom />
    </ScrollView>
  )
}
