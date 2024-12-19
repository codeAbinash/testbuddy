import Btn from '@components/Button'
import { PaddingBottom, PaddingTop } from '@components/SafePadding'
import { Medium } from '@utils/fonts'
import { ScrollView } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

export default function Example() {
  const height = useSharedValue(0)

  const style = useAnimatedStyle(() => {
    return {
      height: height.value,
      width: 100,
    }
  }, [height.value])

  function updateHeight() {
    height.value = withTiming(200)
  }

  return (
    <ScrollView className='flex-1 p-5'>
      <PaddingTop />
      <ScrollView className='flex-1 gap-3'>
        <Medium>Hello World</Medium>
        <Animated.View className='bg-red-500' style={style}>
          <Medium>Hello World</Medium>
        </Animated.View>
        <Btn onPress={updateHeight}>Update Height</Btn>
      </ScrollView>
      <PaddingBottom />
    </ScrollView>
  )
}
