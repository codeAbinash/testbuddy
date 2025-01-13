import React, { useState } from 'react'
import { Keyboard, KeyboardAvoidingView, Platform, ScrollViewProps, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

interface KeyboardAvoidingContainerProps extends ScrollViewProps {}

export function KeyboardAvoid(props: KeyboardAvoidingContainerProps) {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false)
  React.useEffect(() => {
    const keyboardShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setIsKeyboardVisible(true)
    })
    const keyboardHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setIsKeyboardVisible(false)
    })
    return () => {
      keyboardShowListener.remove()
      keyboardHideListener.remove()
    }
  }, [])
  return (
    <View style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
        enabled={isKeyboardVisible}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          keyboardShouldPersistTaps='always'
          {...props}
        ></ScrollView>
      </KeyboardAvoidingView>
    </View>
  )
}
