import React from 'react'
import { Pressable, type PressableProps } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
export type CustomPressProps = PressableProps & {
  children?: React.ReactNode
  activeOpacity?: number
  activeScale?: number
  duration?: number
  disabled?: boolean
  variant?: 'primary' | 'secondary'
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

export default function Press({
  children,
  style,
  activeOpacity = 0.8,
  activeScale = 0.98,
  duration = 100,
  disabled = false,
  ...props
}: CustomPressProps) {
  const scale = useSharedValue(1)
  const opacity = useSharedValue(1)
  const pan = Gesture.Pan()
    .onBegin(() => {
      if (disabled) return
      scale.value = withTiming(activeScale, { duration })
      opacity.value = withTiming(activeOpacity, { duration })
    })
    .onEnd(() => {
      if (disabled) return
      scale.value = withTiming(1, { duration })
      opacity.value = withTiming(1, { duration })
    })
    .onFinalize(() => {
      if (disabled) return
      scale.value = withTiming(1, { duration })
      opacity.value = withTiming(1, { duration })
    })

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ scale: disabled ? 1 : scale.value }],
      opacity: disabled ? 0.7 : opacity.value,
    }
  })

  return (
    <GestureDetector gesture={pan}>
      <AnimatedPressable style={[animatedStyles, style]} disabled={disabled} {...props}>
        {children}
      </AnimatedPressable>
    </GestureDetector>
  )
}
