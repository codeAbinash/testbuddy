import Btn from '@components/Button'
import { H } from '@utils/dimensions'
import { Medium, SemiBold } from '@utils/fonts'
import type { NavProp } from '@utils/types'
import React from 'react'
import { Modal, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

export default function Test({ navigation }: NavProp) {
  const [open, setOpen] = React.useState(false)
  return (
    <View className='flex-1 items-center justify-center px-5'>
      <Medium className='mb-5 text-center text-base text-black dark:text-white'>
        This is a test Screen. Functional and state based custom Modal Alert testing for this application.
      </Medium>
      <Btn onPress={() => setOpen(true)}>Open Modal</Btn>
      <Medium className='mt-5 text-black dark:text-white'>
        Go to{' '}
        <Medium className='text-blue-400 active:underline' onPressOut={() => navigation.navigate('Splash')}>
          Splash Screen
        </Medium>
      </Medium>
      <Modal
        animationType='fade'
        transparent={true}
        visible={open}
        onRequestClose={() => {
          console.log('Modal has been closed.')
        }}
        hardwareAccelerated
        statusBarTranslucent
      >
        <View className='flex-1 items-center justify-center bg-black/20'>
          <View className='w-[85%] rounded-xl bg-white px-6 py-5 pb-5 dark:bg-zinc-900'>
            <SemiBold className='text-lg text-black dark:text-white'>Are you sure?</SemiBold>
            <ScrollView style={{ maxHeight: H / 2, marginTop: 10 }}>
              <Medium className='text-sm leading-4 text-black dark:text-white'>
                Are you sure you want to delete this item? This action cannot be undone.
              </Medium>
            </ScrollView>
            <View className='mt-5 flex-row items-center justify-end'>
              <SmallButton
                text='Cancel'
                onPress={() => {
                  setOpen(false)
                }}
              />
              <SmallButton
                text='Ok'
                onPress={() => {
                  setOpen(false)
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

function SmallButton({ text, onPress }: { text: string; onPress?: () => void }) {
  return (
    <TouchableOpacity
      className='rounded-md px-5 py-2.5 active:bg-black/5 dark:active:bg-white/10'
      onPress={onPress}
      activeOpacity={1}
    >
      <SemiBold className='text-sm text-black dark:text-white'>{text}</SemiBold>
    </TouchableOpacity>
  )
}
