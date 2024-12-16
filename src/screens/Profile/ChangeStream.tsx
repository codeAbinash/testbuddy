import popupStore from '@/zustand/popupStore'
import { PhysicsStrokeRoundedIcon, StudentsStrokeRoundedIcon } from '@assets/icons/icons'
import Btn from '@components/Button'
import DropdownExtended from '@components/DropdownExtended'
import { InputIcon } from '@components/Input'
import Label from '@components/Label'
import { Lottie } from '@components/Lottie'
import { PaddingBottom } from '@components/SafePadding'
import api from '@query/api'
import { queryClient } from '@query/query'
import { Std, Stream } from '@screens/utils'
import { useMutation, useQuery } from '@tanstack/react-query'
import { W } from '@utils/dimensions'
import { Medium, SemiBold } from '@utils/fonts'
import { NavProps } from '@utils/types'
import { useColorScheme } from 'nativewind'
import { useEffect, useState } from 'react'
import { StatusBar, ToastAndroid, View } from 'react-native'

export default function ChangeStream({ navigation }: NavProps) {
  const { colorScheme } = useColorScheme()
  const [std, setStd] = useState('')
  const [stream, setStream] = useState('')
  const alert = popupStore((store) => store.alert)

  const { data: profile, isPending } = useQuery({ queryKey: ['profile'], queryFn: api.profile })
  const { mutate: updateProfile, isPending: isUpdating } = useMutation({
    mutationKey: ['updateProfile'],
    mutationFn: api.updateProfile,
    onSuccess(data) {
      if (!data) return alert('Failed', 'Failed to update profile. Please try again.')
      if (data.isAlert) return alert('Failed', data.message || 'Failed to update profile. Please try again.')
      if (!data.name) return alert('Failed', data.message || 'Something went wrong. Please try again.')
      ToastAndroid.show('Changes saved successfully', ToastAndroid.SHORT)
      navigation.goBack()
      queryClient.invalidateQueries({ queryKey: ['profile'] })
    },
  })

  function handleSubmit() {
    if (!std) return alert('Invalid Input', 'Please select your standard')
    if (!stream) return alert('Invalid Input', 'Please select your stream')
    updateProfile({ std, stream })
  }

  useEffect(() => {
    if (profile) {
      setStd(profile.std || '')
      setStream(profile.stream || '')
    }
  }, [profile])

  return (
    <>
      <StatusBar barStyle='default' />
      <View className='flex-1 justify-between bg-white p-5 pb-3 dark:bg-zinc-950'>
        <View>
          <View className='mx-auto h-1.5 w-28 justify-between rounded-full bg-zinc-200 dark:bg-zinc-800' />
          <SemiBold className='text mt-3 text-center text-lg'>Change Stream</SemiBold>
        </View>
        <View>
          <Lottie
            source={require('../../assets/animations/lottie/student.lottie')}
            style={{ width: '100%', height: W * 0.75 }}
          />
          <View className='gap-5'>
            <View>
              <Label text='Std' />
              <DropdownExtended
                Left={<InputIcon Icon={StudentsStrokeRoundedIcon} />}
                placeholder='e.g. 11th or 12th or Dropper'
                data={Std}
                maxHeight={150}
                labelField='label'
                valueField='value'
                value={std}
                onChange={(item) => setStd(item.value)}
                colorScheme={colorScheme}
              />
            </View>
            <View>
              <Label text='Stream' />
              <DropdownExtended
                Left={<InputIcon Icon={PhysicsStrokeRoundedIcon} />}
                placeholder='e.g. Engineering or Medical'
                data={Stream}
                labelField='label'
                valueField='value'
                value={stream}
                onChange={(item) => setStream(item.value)}
                colorScheme={colorScheme}
              />
            </View>
          </View>
          <Medium className='text mt-10 text-center text-sm opacity-80'>
            Change your stream to get the best content for your preparation. You can change your stream anytime.
          </Medium>
        </View>
        <Btn
          title={isPending || isUpdating ? 'Updating...' : 'Save Changes'}
          onPress={handleSubmit}
          disabled={isPending || isUpdating || !std || !stream}
        />
      </View>
      <PaddingBottom />
    </>
  )
}
