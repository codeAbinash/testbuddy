import { useEffect, useRef } from 'react'

import { W } from '@utils/dimensions'
import LottieView, { type LottieViewProps } from 'lottie-react-native'

type LottieProps = LottieViewProps & {
  size?: number
  frame?: number
}

export function Lottie({ style, size, source, frame, ...props }: LottieProps) {
  const animationRef = useRef<LottieView>(null)

  useEffect(() => {
    if (frame !== undefined && animationRef.current) {
      animationRef.current.play(frame, frame)
    }
  }, [frame])

  return (
    <LottieView
      source={source}
      style={[{ height: size || W * 0.55, width: size || W * 0.55, marginHorizontal: 'auto' }, style]}
      autoPlay
      loop
      hardwareAccelerationAndroid
      cacheComposition
      ref={animationRef}
      {...props}
    />
  )
}
