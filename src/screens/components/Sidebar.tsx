import sidebarStore from '@/zustand/sidebar'
import { PaddingBottom, PaddingTop } from '@components/SafePadding'
import React from 'react'
import { Animated, ScrollView, TouchableOpacity, View } from 'react-native'
import SmallProfile from './SmallProfile'

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity)

export default function Sidebar() {
  const isOpen = sidebarStore((state) => state.isOpen)
  const toggle = sidebarStore((state) => state.toggle)
  if (!isOpen) return null
  return (
    <AnimatedTouchable
      onPress={toggle}
      className='absolute left-0 top-0 z-10 h-full w-full bg-black/40'
      // entering={FadeIn}
      // exiting={FadeOut}
      activeOpacity={1}
    >
      <View className='w-[80%] flex-1 bg-white dark:bg-zinc-900'>
        <PaddingTop />
        <ScrollView className='flex-1' contentContainerClassName='px-5 flex-1'>
          <TouchableOpacity activeOpacity={1} className='flex-1'>
            <SmallProfile />
          </TouchableOpacity>
        </ScrollView>
        <PaddingBottom />
      </View>
    </AnimatedTouchable>
  )
}
