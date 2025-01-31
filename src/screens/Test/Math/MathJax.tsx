import React, { useCallback, useEffect, useMemo } from 'react'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { WebView } from 'react-native-webview'
import { WebViewEvent } from 'react-native-webview/lib/WebViewTypes'
import colors from 'tailwindcss/colors'
import { getWrappedHtml, MathJaxProps } from './utils'

const MathJax = React.memo<MathJaxProps>(({ html, mathJaxOptions, colorScheme, ...rest }) => {
  const height = useSharedValue(0)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const wrappedHtml = useMemo(() => getWrappedHtml(html || '', colorScheme), [html, mathJaxOptions, colorScheme])
  const style = useAnimatedStyle(() => ({ height: height.value }), [height.value, html])

  const handleMessage = useCallback((event: WebViewEvent) => {
    height.value = withTiming(Number((event.nativeEvent as any).data))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    height.value = withTiming(0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [html])

  return (
    <Animated.View style={style}>
      <WebView
        scrollEnabled={false}
        onMessage={handleMessage}
        source={{ html: wrappedHtml }}
        style={{ backgroundColor: colorScheme === 'dark' ? 'black' : colors.zinc[50] }}
        overScrollMode='never'
        scalesPageToFit={true}
        bounces={false}
        {...rest}
      />
    </Animated.View>
  )
})

export default MathJax
