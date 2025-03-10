import React, { useEffect } from 'react'
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated'

export function Skeleton({ children }: { children: React.ReactNode }) {
  const opacity = useSharedValue(1)

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const randomDuration = Math.random() * 700 + 500
    opacity.value = withRepeat(
      withTiming(0.5, {
        duration: randomDuration,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true,
    )
  }, [])

  const animatedStyle = useAnimatedStyle(() => ({ opacity: opacity.value }))
  return <Animated.View style={animatedStyle}>{children}</Animated.View>
}
