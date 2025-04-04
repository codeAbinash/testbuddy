import { StyleSheet, useColorScheme } from 'react-native'
import Animated, { interpolateColor, useAnimatedStyle, useDerivedValue, withTiming } from 'react-native-reanimated'
const TC_W = 50 // Toggle Container Width
const TC_H = 26 // Toggle Container Height
const T_W = 17 // Toggle Width
const PAD = (TC_H - T_W) / 2 + 0.025 // Padding
const AVAIL_W = TC_W - T_W - PAD * 2 // Available Width
const duration = 200

const styles = StyleSheet.create({
  toggleContainer: {
    width: TC_W,
    height: TC_H,
    borderRadius: 100,
    padding: PAD,
  },
  toggle: {
    width: T_W,
    height: T_W,
    borderRadius: 100,
    backgroundColor: 'white',
  },
})

interface ToggleProps {
  isActive: boolean
  accent?: string
}

export function Toggle({ isActive, accent }: ToggleProps) {
  const scheme = useColorScheme()
  const progress = useDerivedValue(() => (isActive ? AVAIL_W : 0), [isActive])

  const backgroundColorStyle = useAnimatedStyle(() => {
    const backgroundColor = withTiming(
      interpolateColor(
        progress.value,
        [0, AVAIL_W],
        [scheme === 'dark' ? '#27272a' : '#e4e4e7', accent || scheme === 'dark' ? '#3f3f46' : '#3f3f46'],
      ),
      { duration },
    )
    return { backgroundColor }
  }, [accent, scheme, progress])

  const customSpringStyle = useAnimatedStyle(() => {
    return { transform: [{ translateX: withTiming(progress.value, { duration }) }] }
  }, [progress])

  return (
    <Animated.View style={[styles.toggleContainer, backgroundColorStyle]}>
      <Animated.View style={[styles.toggle, customSpringStyle]}></Animated.View>
    </Animated.View>
  )
}
