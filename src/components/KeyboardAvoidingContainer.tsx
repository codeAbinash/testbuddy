import React from 'react'
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollViewProps, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { PaddingBottom, PaddingTop } from './SafePadding'

interface KeyboardAvoidingContainerProps extends ScrollViewProps {}

export default function KeyboardAvoidingContainer(props: KeyboardAvoidingContainerProps) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          {...props}
          keyboardShouldPersistTaps='always'
        ></ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export function KeyboardAvoid(props: ScrollViewProps) {
  return (
    <View className='flex-1'>
      <PaddingTop />
      <KeyboardAvoidingContainer {...props}></KeyboardAvoidingContainer>
      <PaddingBottom />
    </View>
  )
}
